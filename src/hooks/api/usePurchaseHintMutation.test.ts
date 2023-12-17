import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import usePurchaseHintMutation from './usePurchaseHintMutation';

jest.mock('@/lib/api/ApiService');

describe('usePurchaseHintMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.purchaseHint as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderusePurchaseHintMutationHook = () => renderHook(
    () => usePurchaseHintMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderusePurchaseHintMutationHook();

    await result.current({ voteId: 0, hintId: 0 });
  });
});
