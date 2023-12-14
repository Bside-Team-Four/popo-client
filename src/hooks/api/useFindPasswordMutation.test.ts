import { renderHook } from '@testing-library/react';

import useFindPasswordMutation from '@/hooks/api/useFindPasswordMutation';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

jest.mock('@/lib/api/ApiService');

describe('useFindPasswordMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.passwordMissing as jest.Mock).mockImplementation(() => ({
      code: 0,
      value: {
        userId: 100,
      },
    }));
  });

  const renderuseFindPasswordMutationHook = () => renderHook(
    () => useFindPasswordMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('호출 Test', async () => {
    const { result } = renderuseFindPasswordMutationHook();

    await result.current.passwordMissingMutation.mutate({ email: 'popo@gmail.com' });
    await result.current.passwordMissingAuthMutation.mutate({ userId: 100, userCode: '1234' });
    await result.current.passwordResetMutation.mutate({ userId: 100, toChangePassword: '1234' });
  });
});
