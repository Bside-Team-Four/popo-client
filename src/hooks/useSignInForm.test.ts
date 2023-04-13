import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { act, renderHook } from '@testing-library/react';

import { FindPasswordName } from '@/hooks/useFindPasswordForm';
import useSignInForm, { SignInForm } from '@/hooks/useSignInForm';
import { getTestForm } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('useSignInForm', () => {
  const routerReplace = jest.fn();

  const {
    register, resetField, formState, setError, setFocus,
  } = getTestForm();

  const handleSubmit = (onValid: (data:SignInForm)=>void) => () => {
    onValid({
      email: given.email,
      password: given.password,
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

  const renderSignInFormHook = () => renderHook(
    () => useSignInForm(),
  );

  context('submit event test', () => {
    it('email과 password가 일치하지 않을 경우 에러를 발생시킨다.', () => {
      given('email', () => 'popo@gmail.com');
      given('password', () => '4321');

      const { result } = renderSignInFormHook();

      act(() => {
        result.current.onSubmit();
      });

      expect(setError).toHaveBeenCalledWith('password', { message: '비밀번호가 일치하지 않아요.' });
      expect(setFocus).toHaveBeenCalledWith('password');
    });

    it('email과 password가 일치할 경우 root 경로로 이동한다.', () => {
      given('email', () => 'popo@gmail.com');
      given('password', () => '1234');

      const { result } = renderSignInFormHook();

      act(() => {
        result.current.onSubmit();
      });

      expect(routerReplace).toHaveBeenCalled();
    });
  });

  context('reset event test', () => {
    it('reset email', () => {
      const { result } = renderSignInFormHook();

      result.current.email.onClickReset();

      expect(resetField).toHaveBeenCalledWith('email');
      expect(setFocus).toHaveBeenCalledWith('email');
    });
    it('reset password', () => {
      const { result } = renderSignInFormHook();

      result.current.password.onClickReset();

      expect(resetField).toHaveBeenCalledWith('password');
      expect(setFocus).toHaveBeenCalledWith('password');
    });
  });
});
