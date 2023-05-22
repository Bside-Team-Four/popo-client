import { renderHook } from '@testing-library/react';

import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useSignUpEmailMutation from './useSignUpEmailMutation';

jest.mock('@/lib/api/ApiService');

describe('useSignUpEmailMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.signUpSendEmail as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));

    (apiService.signUpAuthEmail as jest.Mock).mockImplementation(() => ({
      code: 0,
      message: 'ok',
    }));
  });

  const renderUseSignUpEmailMutationHook = () => renderHook(
    () => useSignUpEmailMutation(),
    {
      wrapper,
    },
  );

  // eslint-disable-next-line jest/expect-expect
  it('Mutation Test', async () => {
    const { result } = renderUseSignUpEmailMutationHook();

    await result.current.signUpSendEmailMutation.mutate({ email: 'popo@gmail.com' });
    await result.current.signUpAuthEmailMutation.mutate({ email: 'popo@gmail.com', userCode: '123456' });
  });
});
