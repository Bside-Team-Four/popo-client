import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetPolls from './useGetPolls';

jest.mock('@/lib/api/ApiService');

describe('useGetPolls', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchPollList as jest.Mock).mockImplementation(() => ({
      value: {
        totalQuestionCount: 3,
        userCurrentIndex: 1,
        polls: fixtures.polls,
      },
    }));
  });

  const renderUseGetPollsHook = () => renderHook(() => useGetPolls(), { wrapper });

  it('returns my profile', async () => {
    const { result } = renderUseGetPollsHook();

    await waitFor(() => {
      expect(result.current.data?.polls).toEqual(fixtures.polls);
    });
  });
});
