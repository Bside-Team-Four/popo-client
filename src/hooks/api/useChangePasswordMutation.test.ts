import { renderHook } from '@testing-library/react';

import useChangePasswordMutation from '@/hooks/api/useChangePasswordMutation';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

jest.mock('@/lib/api/ApiService');

describe('useChangePasswordMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.passwordMissing as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
      value: {},
    }));
  });

  const renderuseChangePasswordMutationHook = () => renderHook(
    () => useChangePasswordMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('호출 Test', async () => {
    const { result } = renderuseChangePasswordMutationHook();

    await result.current.mutate({ currPassword: 'currPassword!23', toChangePassword: 'toChangePassword!23' });
  });
});
