import { act, renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useNotificationSetting from './useNotificationSetting';

jest.mock('next-auth/react');

jest.mock('@/lib/api/ApiService');

describe('useNotificationSetting', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchNotificationSettings as jest.Mock).mockImplementation(
      () => given.notificationSetting,
    );

    (apiService.toggleNotificationSetting as jest.Mock).mockImplementation(
      () => {
        given('notificationSetting', () => ({
          code: 0,
          message: 'ok',
          value: { chosenOption: false, hourOption: true },
        }));
        return {
          code: 0,
          message: 'ok',
        };
      },
    );
  });

  const renderNotifiuseNotificationSettingHook = () => renderHook(
    () => useNotificationSetting(),
    { wrapper },
  );

  describe('알림 설정 조회시', () => {
    context('', () => {
      given('notificationSetting', () => ({
        code: 0,
        message: 'ok',
        value: fixtures.notificationSettings,
      }));

      it('알림 설정을 가져온다', async () => {
        const { result } = renderNotifiuseNotificationSettingHook();
        await waitFor(() => {
          expect(result.current.settings).toEqual(fixtures.notificationSettings);
        });
      });

      it('알림 설정이 on인 상태에서 토글을 호출하면 off가 된다.', async () => {
        const { result } = renderNotifiuseNotificationSettingHook();

        await act(async () => {
          await result.current.toggleNotificationSettingChosenType();
        });

        await waitFor(() => {
          expect(result.current.settings).toEqual({ chosenOption: false, hourOption: true });
        });
      });
    });
  });
});
