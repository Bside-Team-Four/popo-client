import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Setting from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('Setting', () => {
  const routerPush = jest.fn();
  const signOutMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
    }));
    (signOut as jest.Mock).mockImplementation(() => signOutMock());
  });

  const renderSetting = () => renderWithProviders(<Setting />);

  context('프로필 관리를 클릭했을 때', () => {
    it('프로필 관리 페이지로 이동한다.', () => {
      renderSetting();

      const settingItem = screen.getByText('프로필 관리');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/setting/profile-setting');
    });
  });

  context('알림 설정을 클릭했을 때', () => {
    it('알림 설정 페이지로 이동한다.', () => {
      renderSetting();

      const settingItem = screen.getByText('알림 설정');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/setting/notification');
    });
  });

  context('이용약관을 클릭했을 때', () => {
    it('이용약관 페이지로 이동한다.', () => {
      renderSetting();

      const settingItem = screen.getByText('이용약관');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/setting/tos');
    });
  });

  context('비밀번호 변경을 클릭했을 때', () => {
    it('비밀번호 변경 페이지로 이동한다.', () => {
      renderSetting();

      const settingItem = screen.getByText('비밀번호 변경');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/setting/change-password');
    });
  });

  context('회원탈퇴를 클릭했을 때', () => {
    it('회원탈퇴 페이지로 이동한다.', () => {
      renderSetting();

      const settingItem = screen.getByText('회원탈퇴');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/setting/remove-account');
    });
  });

  context('로그아웃을 클릭했을 때', () => {
    it('로그아웃 된다.', () => {
      renderSetting();

      const settingItem = screen.getByText('로그아웃');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(signOutMock).toHaveBeenCalled();
    });
  });
});
