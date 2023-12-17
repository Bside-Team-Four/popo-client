import { useInView } from 'react-intersection-observer';

import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetInfiniteAlarm from './useGetInfiniteAlarms';

jest.mock('@/lib/api/ApiService');

describe('useGetInfiniteAlarms', () => {
  const renderUseGetalarmsHook = () => renderHook(() => useGetInfiniteAlarm(), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetAlarms as jest.Mock).mockImplementation(() => (
      {
        value: fixtures.alarm,
      }
    ));
    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));
  });

  it('returns alarm data', async () => {
    const { result } = renderUseGetalarmsHook();
    await waitFor(() => {
      expect(result.current.alarms).toEqual(fixtures.alarm);
    });
  });
});
