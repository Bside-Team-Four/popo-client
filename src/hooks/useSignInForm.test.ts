import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { renderHook, waitFor } from '@testing-library/react';

import { FindPasswordName } from '@/hooks/useFindPasswordForm';
import useSignInForm, { SignInForm } from '@/hooks/useSignInForm';
import { getTestForm } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('next-auth/react');

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
    (signIn as jest.Mock).mockImplementation(() => ({
      ok: given.ok,
      error: given.error,
    }));
  });

  const renderSignInFormHook = () => renderHook(
    () => useSignInForm(),
  );

  describe('로그인 테스트', () => {
    it('로그인이 성공했을 경우 투표 대기화면으로 이동한다.', async () => {
      given('email', () => 'popo@gmail.com');
      given('password', () => '1234');
      given('ok', () => true);
      given('error', () => false);

      const { result } = renderSignInFormHook();

      await waitFor(() => {
        result.current.onSubmit();
      });

      expect(routerReplace).toHaveBeenCalled();
    });

    it('로그인이 실패했을 경우 비밀번호 필드에 에러메세지를 띄우고, 포커스시킨다.', async () => {
      given('email', () => 'popo@gmail.com');
      given('password', () => '4321');
      given('ok', () => false);
      given('error', () => true);

      const { result } = renderSignInFormHook();

      await waitFor(() => {
        result.current.onSubmit();
      });

      expect(setError).toHaveBeenCalledWith('password', { message: '비밀번호가 일치하지 않아요.' });
      expect(setFocus).toHaveBeenCalledWith('password');
    });
  });

  describe('텍스트필드 초기화 테스트', () => {
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
