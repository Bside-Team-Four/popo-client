import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useFollowMutation from './useFollowMutation';

jest.mock('@/lib/api/ApiService');

describe('useFollowMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.follow as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));

    (apiService.unfollow as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderUseFollowMutationHook = () => renderHook(
    () => useFollowMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderUseFollowMutationHook();

    await result.current.followMutation.mutate(1);
    await result.current.unfollowMutation.mutate(1);
  });
});
