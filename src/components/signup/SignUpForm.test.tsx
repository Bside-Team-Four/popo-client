import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const renderSignUpForm = () => renderWithProviders(
    <SignUpForm
      step={given.step}
      formData={signupField}
      onResend={jest.fn()}
    />,
  );

  context('회원가입 첫 번째 화면일 때', () => {
    given('step', () => 1);

    it('이메일 입력 필드를 화면에 보여준다.', () => {
      renderSignUpForm();

      expect(screen.getByText('이메일')).toBeInTheDocument();
    });
  });

  context('회원가입 네 번째 화면일 때', () => {
    given('step', () => 4);

    it('이름 입력 필드를 화면에 보여준다.', () => {
      renderSignUpForm();

      expect(screen.getByText('이름')).toBeInTheDocument();
    });
  });
});
