import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { act, renderHook } from '@testing-library/react';
import _ from 'lodash/fp';

import testRegister from '@/fixtures/testRegister';
import useFindPasswordForm, { FindPasswordForm, FindPasswordName } from '@/hooks/useFindPasswordForm';
import { getTestForm } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('useFindPasswordForm', () => {
  const routerReplace = jest.fn();

  const {
    resetField, formState, setError, setFocus,
  } = getTestForm();

  const register = (name: string, options: any) => ({
    ...testRegister,
    name,
    validate: options?.validate,
  });

  const handleSubmit = (onValid: (data:FindPasswordForm)=>void) => () => {
    onValid({
      email: given.name,
      certificationNumber: given.certificationNumber,
      password: given.password,
      passwordConfirm: given.passwordConfirm,
    });
  };
  const watch = (name: FindPasswordName) => given[name];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: routerReplace,
    }));
    (useForm as jest.Mock).mockImplementation(() => ({
      register,
      watch,
      resetField,
      formState,
      setError,
      setFocus,
      handleSubmit,
    }));
  });

  const renderFindPasswordFormHook = () => renderHook(
    () => useFindPasswordForm(),
  );

  context('step별 submit event test', () => {
    it('STEP 0', () => {
      const { result } = renderFindPasswordFormHook();

      expect(result.current.step).toEqual(0);
    });
    it('STEP 1', () => {
      const { result } = renderFindPasswordFormHook();

      act(() => {
        result.current.onSubmit();
      });

      expect(result.current.step).toEqual(1);
    });
    it('STEP 2', () => {
      const { result } = renderFindPasswordFormHook();

      Array.from({ length: 2 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(2);
    });
    it('password === passwordConfirm router replace', () => {
      given('password', () => '12345678');
      given('passwordConfirm', () => '12345678');
      const { result } = renderFindPasswordFormHook();

      Array.from({ length: 3 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(routerReplace).toHaveBeenCalled();
    });
  });

  context('passwordConfirm Validation Test', () => {
    it('password === passwordConfirm', () => {
      given('password', () => '12345678');

      const { result } = renderFindPasswordFormHook();

      const { passwordConfirm } = result.current.formData;

      const validate = _.get('register.validate')(passwordConfirm);

      expect(validate('12345678')).toBe(true);
    });
    it('password !== passwordConfirm', () => {
      given('password', () => '12345678');

      const { result } = renderFindPasswordFormHook();

      const { passwordConfirm } = result.current.formData;

      const validate = _.get('register.validate')(passwordConfirm);

      expect(validate('123456789')).toBe('비밀번호가 일치하지 않습니다.');
    });
  });

  context('reset event Test', () => {
    it('email', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.email.onClickReset();

      expect(resetField).toHaveBeenCalledWith('email');
      expect(setFocus).toHaveBeenCalledWith('email');
    });
    it('certificationNumber', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.certificationNumber.onClickReset();

      expect(resetField).toHaveBeenCalledWith('certificationNumber');
      expect(setFocus).toHaveBeenCalledWith('certificationNumber');
    });
    it('password', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
    it('passwordConfirm', () => {
      const { result } = renderFindPasswordFormHook();

      result.current.formData.passwordConfirm.onClickReset();

      expect(resetField).toHaveBeenCalledWith('passwordConfirm');
      expect(setFocus).toHaveBeenCalledWith('passwordConfirm');
    });
  });
});
