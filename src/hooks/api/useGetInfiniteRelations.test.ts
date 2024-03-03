import { useInView } from 'react-intersection-observer';

import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetInfiniteRelations from './useGetInfiniteRelations';

jest.mock('@/lib/api/ApiService');

describe('useGetInfiniteRelations', () => {
  const renderUseGetUsersHook = () => renderHook(() => useGetInfiniteRelations(
    { type: 'followee' },
  ), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetFollowee as jest.Mock).mockImplementation(() => (
      {
        value: fixtures.user,
      }
    ));
    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));
  });

  it('returns user data', async () => {
    const { result } = renderUseGetUsersHook();
    await waitFor(() => {
      expect(result.current.userData).toEqual(fixtures.user);
    });
  });
});
