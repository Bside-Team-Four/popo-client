import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useToggleNotificationSettingMutation from './useToggleNotificationSettingMutation';

jest.mock('@/lib/api/ApiService');

describe('useToggleNotificationSettingMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.removeAccount as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderuseToggleNotificationSettingMutationHook = (type:'chosen' | 'hour') => renderHook(
    () => useToggleNotificationSettingMutation(type),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderuseToggleNotificationSettingMutationHook('chosen');
    await result.current();
  });
});
