import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import SignIn from '@/components/signin/index';
import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('SignIn', () => {
  const register = (name: string) => ({ ...fixtures.register, name });
  const watch = (name: string) => name;
  const resetField = jest.fn();
  const formState = { errors: {} };
  const setError = jest.fn();
  const setFocus = jest.fn();
  const handleSubmit = (onValid: (data:{ email: string, password:string })=>void) => {
    onValid({ email: given.emailValue, password: given.passwordValue });
  };

  const routerPush = jest.fn();
  const routerReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockImplementation(() => ({
      register,
      watch,
      resetField,
      formState,
      setError,
      setFocus,
      handleSubmit,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
      replace: routerReplace,
    }));
  });

  const renderSignIn = () => renderWithProviders(<SignIn />);

  it('Title render', () => {
    renderSignIn();
    expect(screen.getByText(/이메일로 로그인 할게요/)).toBeInTheDocument();
  });

  it('reset event check', () => {
    renderSignIn();

    fireEvent.focus(screen.getByTestId('email-test-input'));

    const emailResetIcon = screen.getByAltText('email reset icon');

    expect(emailResetIcon).toBeInTheDocument();

    fireEvent.click(emailResetIcon);

    expect(resetField).toHaveBeenCalledWith('email');
    expect(setFocus).toHaveBeenCalledWith('email');
  });

  it('비밀번호 찾기 버튼 클릭시 router push', () => {
    renderSignIn();

    fireEvent.click(screen.getByText('비밀번호 찾기'));

    expect(routerPush).toHaveBeenCalledWith('/find-password');
  });

  context('로그인 버튼 클릭시', () => {
    it('email, password가 틀리면 에러 메시지가 뜬다.', () => {
      given('emailValue', () => 'popo@naver.com');
      given('passwordValue', () => '7777');

      renderSignIn();

      fireEvent.submit(screen.getByText('로그인'));

      expect(setError).toHaveBeenCalled();
      expect(setFocus).toHaveBeenCalled();
    });

    it('email, password가 맞으면 router를 replace한다.', () => {
      given('emailValue', () => 'popo@gmail.com');
      given('passwordValue', () => '1234');

      renderSignIn();

      fireEvent.submit(screen.getByText('로그인'));

      expect(routerReplace).toHaveBeenCalledWith('/');
    });
  });
});
