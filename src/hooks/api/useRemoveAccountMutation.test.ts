import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useRemoveAccountMutation from './useRemoveAccountMutation';

jest.mock('@/lib/api/ApiService');

describe('useRemoveAccountMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.removeAccount as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderuseRemoveAccountMutationHook = () => renderHook(
    () => useRemoveAccountMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderuseRemoveAccountMutationHook();
    await result.current();
  });
});
