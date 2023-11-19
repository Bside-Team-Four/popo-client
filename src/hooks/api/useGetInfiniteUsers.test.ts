import { useInView } from 'react-intersection-observer';

import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetInfiniteUsers from './useGetInfiniteUsers';

jest.mock('@/lib/api/ApiService');

describe('useGetUsers', () => {
  const renderUseGetUsersHook = () => renderHook(() => useGetInfiniteUsers(
    { keyword: '고등학교', type: 'SCHOOL' },
  ), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetUsers as jest.Mock).mockImplementation(() => (
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
