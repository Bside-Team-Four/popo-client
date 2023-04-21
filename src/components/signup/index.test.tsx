import { fireEvent, screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import useSignUpForm from '@/hooks/useSignUpForm';
import { renderWithProviders } from '@/utils/testHelper';

import SignUp from './index';

jest.mock('@/hooks/useSignUpForm');

describe('SignUp', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSignUpForm as jest.Mock).mockImplementation(() => ({
      step: given.step,
      formData: signupField,
      onSubmit,
    }));
  });

  const renderSignUp = () => renderWithProviders(<SignUp />);

  it('onSubmit 호출', () => {
    given('step', () => 0);
    renderSignUp();

    const button = screen.getByRole('button', { name: '이메일로 인증번호 전송' });

    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
