import { fireEvent, screen } from '@testing-library/react';

import testRegister from '@/fixtures/testRegister';
import { renderWithProviders } from '@/utils/testHelper';

import LoginForm from './LoginForm';

const password = {
  register: { ...testRegister, name: 'password' },
  value: 'password',
};

const email = {
  register: { ...testRegister, name: 'email' },
  value: 'email',
};

describe('LoginForm', () => {
  const emailReset = jest.fn();
  const passwordReset = jest.fn();

  const renderLoginForm = () => renderWithProviders(
    <LoginForm
      password={{ ...password, onClickReset: passwordReset }}
      email={{ ...email, onClickReset: emailReset }}
    />,
  );

  it('renders email, password', () => {
    renderLoginForm();

    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  it('call email reset event', () => {
    renderLoginForm();

    fireEvent.focus(screen.getByTestId('email-test-input'));

    const emailResetIcon = screen.getByAltText('email reset icon');

    expect(emailResetIcon).toBeInTheDocument();

    fireEvent.click(emailResetIcon);

    expect(emailReset).toHaveBeenCalled();
  });

  it('call password reset event', () => {
    renderLoginForm();

    fireEvent.focus(screen.getByTestId('password-test-input'));

    const passwordResetIcon = screen.getByAltText('password reset icon');

    expect(passwordResetIcon).toBeInTheDocument();

    fireEvent.click(passwordResetIcon);

    expect(passwordReset).toHaveBeenCalled();
  });
});
