import { ReactNode } from 'react';

import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import useGetPollStatus from '@/hooks/api/useGetPollStatus';
import { apiService } from '@/lib/api/ApiService';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

jest.mock('@/lib/api/ApiService');

describe('useGetPollStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetPollStatus as jest.Mock).mockImplementation(() => ({
      value: {
        status: 'START',
      },
    }));
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <RecoilRoot>
        <ReactQueryWrapper>
          {children}
        </ReactQueryWrapper>
      </RecoilRoot>
    );
  }

  const renderUseGetPollStatus = () => renderHook(() => useGetPollStatus(), {
    wrapper: Wrapper,
  });

  it('returns poll status', async () => {
    const { result } = renderUseGetPollStatus();

    await waitFor(() => {
      expect(result.current.data?.value).toEqual({ status: 'START' });
    });
  });
});
