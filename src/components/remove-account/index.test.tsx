import { fireEvent, screen } from '@testing-library/react';

import useRemoveAccountMutation from '@/hooks/api/useRemoveAccountMutation';
import MockTheme from '@/test/MockTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { renderWithPortal } from '@/utils/testHelper';

import RemoveAccount from './index';

jest.mock('@/hooks/api/useRemoveAccountMutation');

describe('RemoveAccount', () => {
  const removeAccountMock = jest.fn();
  (useRemoveAccountMutation as jest.Mock).mockImplementation(() => removeAccountMock);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderRemoveAccount = () => renderWithPortal(
    <ReactQueryWrapper>
      <MockTheme>
        <RemoveAccount />
      </MockTheme>
    </ReactQueryWrapper>,
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
  });

  context('회원탈퇴 버튼을 누르면', () => {
    it('회원탈퇴 함수를 호출한다.', () => {
      renderRemoveAccount();

      fireEvent.click(screen.getByAltText('uncheck icon'));
      fireEvent.click(screen.getByText('POPO 탈퇴'));

      expect(removeAccountMock).toHaveBeenCalled();
    });
  });
});
