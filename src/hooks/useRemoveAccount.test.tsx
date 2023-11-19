import { signOut } from 'next-auth/react';

import { act, renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useRemoveAccount from './useRemoveAccount';

jest.mock('next-auth/react');

jest.mock('@/lib/api/ApiService');

describe('useReoveAccount', () => {
  const signOutMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.removeAccount as jest.Mock).mockImplementation(() => given.removeAccount);
    (signOut as jest.Mock).mockImplementation(() => signOutMock());
  });

  const renderRemoveAccountHook = () => renderHook(
    () => useRemoveAccount(),
    { wrapper },
  );

  describe('유저 탈퇴시', () => {
    context('', () => {
      given('removeAccount', () => ({
        code: 0,
        message: 'ok',
      }));
      it('팝업을 띄운다.', async () => {
        const { result } = renderRemoveAccountHook();

        await act(async () => {
          await result.current.removeAccount();
        });

        expect(result.current.popInfo.show).toBe(true);
      });

      it('팝업을 닫으면 로그아웃 시킨다.', async () => {
        const { result } = renderRemoveAccountHook();

        await act(async () => {
          await result.current.popInfo.onClose();
        });

        expect(signOutMock).toHaveBeenCalled();
      });
    });
  });
});
