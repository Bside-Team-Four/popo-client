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
      value: {
        userId: 100,
      },
    }));
  });

  const renderUseChangePasswordMutationHook = () => renderHook(
    () => useChangePasswordMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('호출 Test', async () => {
    const { result } = renderUseChangePasswordMutationHook();

    await result.current.passwordMissingMutation.mutate({ email: 'popo@gmail.com' });
    await result.current.passwordMissingAuthMutation.mutate({ userId: 100, userCode: '1234' });
    await result.current.passwordResetMutation.mutate({ userId: 100, toChangePassword: '1234' });
  });
});
