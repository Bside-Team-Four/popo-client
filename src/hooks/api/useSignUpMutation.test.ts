import { renderHook } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useSignUpMutation from './useSignUpMutation';

jest.mock('@/lib/api/ApiService');

describe('useSignUpMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.signUp as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderUseSignUpMutationHook = () => renderHook(
    () => useSignUpMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderUseSignUpMutationHook();

    await result.current(fixtures.signupUser);
  });
});
