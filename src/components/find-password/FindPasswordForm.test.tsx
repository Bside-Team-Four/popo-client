import { screen } from '@testing-library/react';

import FindPasswordForm from '@/components/find-password/FindPasswordForm';
import testRegister from '@/fixtures/testRegister';
import { renderWithProviders } from '@/utils/testHelper';

const email = {
  register: { ...testRegister, name: 'email' },
  value: 'email',
};

const certificationNumber = {
  register: { ...testRegister, name: 'certificationNumber' },
  value: 'certificationNumber',
};

const password = {
  register: { ...testRegister, name: 'password' },
  value: 'password',
};

const passwordConfirm = {
  register: { ...testRegister, name: 'passwordConfirm' },
  value: 'passwordConfirm',
};

describe('FindPasswordForm', () => {
  const renderFindPasswordForm = () => renderWithProviders(
    <FindPasswordForm
      step={given.step}
      formData={{
        email: { ...email, value: 'popo@gmail.com', onClickReset: jest.fn() },
        certificationNumber: { ...certificationNumber, onClickReset: jest.fn() },
        password: { ...password, value: '12341234A', onClickReset: jest.fn() },
        passwordConfirm: { ...passwordConfirm, value: '12341234A', onClickReset: jest.fn() },
      }}
    />,
  );

  context('with step 0', () => {
    given('step', () => 0);
    it('step0 form 렌더링', () => {
      renderFindPasswordForm();

      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    });
  });

  context('with step 1', () => {
    given('step', () => 1);
    it('step1 form 렌더링', () => {
      renderFindPasswordForm();

      expect(screen.getByLabelText('인증번호')).toBeInTheDocument();
    });
  });

  context('with step 2', () => {
    given('step', () => 2);
    it('step2 form 렌더링', () => {
      renderFindPasswordForm();

      expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
      expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
    });
  });
});
