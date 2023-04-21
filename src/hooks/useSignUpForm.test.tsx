import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { act, renderHook } from '@testing-library/react';
import _ from 'lodash/fp';

import testRegister from '@/fixtures/testRegister';
import useSignUpForm, { SignUpForm, SignUpName } from '@/hooks/useSignUpForm';
import { getTestForm } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('useSignUpForm', () => {
  const routerReplace = jest.fn();

  const {
    resetField, formState, setError, setFocus,
  } = getTestForm();

  const register = (name: string, options: any) => ({
    ...testRegister,
    name,
    validate: options?.validate,
  });

  const handleSubmit = (onValid: (data:SignUpForm)=>void) => () => {
    onValid({
      email: given.name,
      certificationNumber: given.certificationNumber,
      password: given.password,
      passwordConfirm: given.passwordConfirm,
      name: given.name,
      year: given.year,
      grade: given.grade,
    });
  };
  const watch = (name: SignUpName) => given[name];

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

  const renderSignUpFormHook = () => renderHook(
    () => useSignUpForm(),
  );

  describe('step별 submit event test', () => {
    it('STEP 0', () => {
      const { result } = renderSignUpFormHook();

      expect(result.current.step).toEqual(0);
    });
    it('STEP 1', () => {
      const { result } = renderSignUpFormHook();

      act(() => {
        result.current.onSubmit();
      });

      expect(result.current.step).toEqual(1);
    });
    it('STEP 2', () => {
      given('password', () => '12345678');
      given('passwordConfirm', () => '12345678');
      const { result } = renderSignUpFormHook();

      Array.from({ length: 2 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(2);
    });
    it('STEP 3', () => {
      const { result } = renderSignUpFormHook();

      Array.from({ length: 3 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(3);
    });
    it('STEP 4', () => {
      const { result } = renderSignUpFormHook();

      Array.from({ length: 4 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(4);
    });
    it('STEP 5', () => {
      const { result } = renderSignUpFormHook();

      Array.from({ length: 5 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(5);
    });
    it('STEP 6', () => {
      given('grade', () => 1);

      const { result } = renderSignUpFormHook();

      act(() => {
        result.current.formData.school.onChangeSchool({ schoolId: 1, name: '포포고등학교' });
      });

      Array.from({ length: 6 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(6);
    });
    it('STEP 7', () => {
      const { result } = renderSignUpFormHook();

      Array.from({ length: 7 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(result.current.step).toEqual(7);
    });
    it('LAST', () => {
      const { result } = renderSignUpFormHook();

      Array.from({ length: 8 }).forEach(() => {
        act(() => {
          result.current.onSubmit();
        });
      });

      expect(routerReplace).toHaveBeenCalled();
    });
  });

  describe('passwordConfirm Validation Test', () => {
    it('password === passwordConfirm', () => {
      given('password', () => '12345678');

      const { result } = renderSignUpFormHook();

      const { passwordConfirm } = result.current.formData;

      const validate = _.get('register.validate')(passwordConfirm);

      expect(validate('12345678')).toBe(true);
    });
    it('password !== passwordConfirm', () => {
      given('password', () => '12345678');

      const { result } = renderSignUpFormHook();

      const { passwordConfirm } = result.current.formData;

      const validate = _.get('register.validate')(passwordConfirm);

      expect(validate('123456789')).toBe('비밀번호가 일치하지 않습니다.');
    });
  });

  describe('reset event Test', () => {
    it('email', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.email.onClickReset();

      expect(resetField).toHaveBeenCalledWith('email');
      expect(setFocus).toHaveBeenCalledWith('email');
    });
    it('certificationNumber', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.certificationNumber.onClickReset();

      expect(resetField).toHaveBeenCalledWith('certificationNumber');
      expect(setFocus).toHaveBeenCalledWith('certificationNumber');
    });
    it('password', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
    it('passwordConfirm', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.passwordConfirm.onClickReset();

      expect(resetField).toHaveBeenCalledWith('passwordConfirm');
      expect(setFocus).toHaveBeenCalledWith('passwordConfirm');
    });
    it('name', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.name.onClickReset();

      expect(resetField).toHaveBeenCalledWith('name');
      expect(setFocus).toHaveBeenCalledWith('name');
    });
    it('year', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.year.onClickReset();

      expect(resetField).toHaveBeenCalledWith('year');
      expect(setFocus).toHaveBeenCalledWith('year');
    });
    it('grade', () => {
      const { result } = renderSignUpFormHook();

      result.current.formData.grade.onClickReset();

      expect(resetField).toHaveBeenCalledWith('grade');
      expect(setFocus).toHaveBeenCalledWith('grade');
    });
  });

  it('gender change event', () => {
    const { result } = renderSignUpFormHook();

    act(() => {
      result.current.formData.gender.onChangeGender('male');
    });

    expect(result.current.formData.gender.value).toBe('male');
  });

  it('school change event', () => {
    const { result } = renderSignUpFormHook();

    act(() => {
      result.current.formData.school.onChangeSchool({ schoolId: 1, name: '포포고등학교' });
    });

    expect(result.current.formData.school.value).toStrictEqual({ schoolId: 1, name: '포포고등학교' });
  });
});
