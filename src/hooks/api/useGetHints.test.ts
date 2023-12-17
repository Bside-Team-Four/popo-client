import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetHints from './useGetHints';

jest.mock('@/lib/api/ApiService');

describe('useGetHints', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchHints as jest.Mock).mockImplementation(() => ({
      value: fixtures.hint,
    }));
  });

  const renderUseGetHintsHook = () => renderHook(() => useGetHints(
    { voteId: 0, targetUserId: 0 },
  ), { wrapper });

  it('returns hints', async () => {
    const { result } = renderUseGetHintsHook();

    await waitFor(() => {
      expect(result.current.data).toEqual(fixtures.hint);
    });
  });
});
