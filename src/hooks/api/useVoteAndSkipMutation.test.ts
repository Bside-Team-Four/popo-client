import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useVoteAndSkipMutation from './useVoteAndSkipMutation';

jest.mock('@/lib/api/ApiService');

describe('useVoteAndSkipMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.vote as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
    (apiService.skip as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderUseVoteAndSkipMutationHook = () => renderHook(
    () => useVoteAndSkipMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderUseVoteAndSkipMutationHook();

    await result.current.vote({ chosenId: 1, questionId: 1 });
    await result.current.skip({ questionId: 1 });
  });
});
