import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetNotificationSettings from './useGetNotificationSettings';

jest.mock('@/lib/api/ApiService');

describe('useGetNotificationSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchNotificationSettings as jest.Mock).mockImplementation(() => ({
      value: fixtures.notificationSettings,
    }));
  });

  const renderUseGetNotificationSettingsHook = () => renderHook(
    () => useGetNotificationSettings(),
    { wrapper },
  );

  it('알림 설정 내역을 보여준다.', async () => {
    const { result } = renderUseGetNotificationSettingsHook();

    await waitFor(() => {
      expect(result.current.data).toEqual(fixtures.notificationSettings);
    });
  });
});
