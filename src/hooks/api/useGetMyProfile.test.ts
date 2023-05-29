import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetMyProfile from './useGetMyProfile';

jest.mock('@/lib/api/ApiService');

describe('useGetMyProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchMyProfile as jest.Mock).mockImplementation(() => ({
      value: fixtures.profile,
    }));
  });

  const renderUseGetMyProfileHook = () => renderHook(() => useGetMyProfile(), { wrapper });

  it('returns my profile', async () => {
    const { result } = renderUseGetMyProfileHook();

    await waitFor(() => {
      expect(result.current.data).toEqual(fixtures.profile);
    });
  });
});
