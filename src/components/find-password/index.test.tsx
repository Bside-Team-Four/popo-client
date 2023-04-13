import { fireEvent, screen } from '@testing-library/react';

import FindPassword from '@/components/find-password/index';
import testRegister from '@/fixtures/testRegister';
import useFindPasswordForm from '@/hooks/useFindPasswordForm';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('@/hooks/useFindPasswordForm');

describe('FindPassword', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFindPasswordForm as jest.Mock).mockImplementation(() => ({
      step: given.step,
      formData: {
        email: { register: { ...testRegister, name: 'email' }, value: 'popo@gmail.com', onClickReset: jest.fn() },
        certificationNumber: { register: { ...testRegister, name: 'certificationNumber' }, onClickReset: jest.fn() },
        password: { register: { ...testRegister, name: 'password' }, value: '12341234A', onClickReset: jest.fn() },
        passwordConfirm: { register: { ...testRegister, name: 'passwordConfirm' }, value: '12341234A', onClickReset: jest.fn() },
      },
      onSubmit,
    }));
  });

  const renderFindPassword = () => renderWithProviders(<FindPassword />);

  it('onSubmit 호출', () => {
    given('step', () => 0);
    renderFindPassword();

    const button = screen.getByRole('button', { name: '이메일로 인증번호 전송' });

    expect(button).toBeInTheDocument();

    fireEvent.submit(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
