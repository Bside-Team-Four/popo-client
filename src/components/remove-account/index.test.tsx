import { signOut } from 'next-auth/react';

import { fireEvent, screen } from '@testing-library/react';

import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

import RemoveAccount from './index';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('RemoveAccount', () => {
  const signOutMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (signOut as jest.Mock).mockImplementation(() => signOutMock());
  });
  const renderRemoveAccount = () => renderWithPortal(
    <MockTheme>
      <RemoveAccount />
    </MockTheme>,
  );

  it('탈퇴 타이틀과 메세지가 보여야 한다.', () => {
    renderRemoveAccount();

    expect(screen.getByText('POPO 탈퇴 유의사항')).toBeInTheDocument();
    expect(screen.getByText('탈퇴 시 팔로잉, 팔로우, 리워드, 힌트 정보가 삭제되고 복구 불가능합니다.')).toBeInTheDocument();
    expect(screen.getByText('탈퇴 후 15일 이후부터 재가입 가능합니다.')).toBeInTheDocument();
  });

  context('체크 아이콘을 클릭하면', () => {
    it('버튼 이미지가 변경된다.', () => {
      renderRemoveAccount();

      fireEvent.click(screen.getByAltText('uncheck icon'));

      expect(screen.getByAltText('check icon')).toBeInTheDocument();
    });

    it('버튼 이미지가 변경된다.', async () => {
      renderRemoveAccount();

      fireEvent.click(screen.getByAltText('uncheck icon'));

      expect(screen.getByAltText('check icon')).toBeInTheDocument();

      fireEvent.click(screen.getByText('POPO 탈퇴'));

      expect(screen.getByText('POPO 탈퇴가 완료되었습니다.')).toBeInTheDocument();
    });
  });

  context('회원탈퇴 팝업을 닫으면', () => {
    it('회원탈퇴와 동시에 로그아웃된다.', () => {
      renderRemoveAccount();

      fireEvent.click(screen.getByAltText('uncheck icon'));
      fireEvent.click(screen.getByText('POPO 탈퇴'));
      fireEvent.click(screen.getByText('확인'));

      expect(signOutMock).toHaveBeenCalled();
    });
  });
});
