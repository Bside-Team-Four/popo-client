import { useInView } from 'react-intersection-observer';

import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetInfiniteReward from './useGetInfiniteRewards';

jest.mock('@/lib/api/ApiService');

describe('useGetInfiniteRewards', () => {
  const renderUseGetRewardsHook = () => renderHook(() => useGetInfiniteReward(), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetRewards as jest.Mock).mockImplementation(() => (
      {
        value: fixtures.reward,
      }
    ));
    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));
  });

  it('returns reward data', async () => {
    const { result } = renderUseGetRewardsHook();
    await waitFor(() => {
      expect(result.current.rewards).toEqual(fixtures.reward);
    });
  });
});
