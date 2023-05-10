import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import ChangePassword from '@/components/change-password/index';
import testRegister from '@/fixtures/testRegister';
import useChangePasswordForm from '@/hooks/useChangePasswordForm';
import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

jest.mock('@/hooks/useChangePasswordForm');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ChangePassword', () => {
  const onSubmit = jest.fn();
  const mockPush = jest.fn();
  const closeModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useChangePasswordForm as jest.Mock).mockImplementation(() => ({
      showPop: given.showPop,
      isActive: given.isActive,
      closeModal,
      formData: {
        currentPassword: { register: { ...testRegister, name: 'currentPassword' }, value: '12341234A', onClickReset: jest.fn() },
        password: { register: { ...testRegister, name: 'password' }, value: '12341234A', onClickReset: jest.fn() },
        passwordConfirm: { register: { ...testRegister, name: 'passwordConfirm' }, value: '12341234A', onClickReset: jest.fn() },
      },
      onSubmit,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });
  const renderChangePassword = () => renderWithPortal(<MockTheme><ChangePassword /></MockTheme>);

  context('모든 값이 입력됬을 때(isActive: true)', () => {
    given('isActive', () => true);

    it('onSubmit 호출', () => {
      renderChangePassword();

      const button = screen.getByRole('button', { name: '변경하기' });

      expect(button).toBeInTheDocument();

      fireEvent.submit(button);
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  context('모달이 띄워졌을 때', () => {
    given('showPop', () => true);

    it('모달 타이틀이 보인다.', () => {
      renderChangePassword();

      expect(screen.getByText('비밀번호 변경이 완료되었습니다.')).toBeInTheDocument();
    });

    context('모달을 닫으면', () => {
      it('모달이 닫히며, 메인페이지로 이동한다.', () => {
        renderChangePassword();

        const button = screen.getByRole('button', { name: '확인' });

        expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();

        fireEvent.click(button);

        expect(closeModal).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });
});
