import { useInView } from 'react-intersection-observer';

import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

import useGetInfiniteSchool from './useGetInfiniteSchool';

jest.mock('@/lib/api/ApiService');

describe('useGetSchool', () => {
  const renderUseGetSchoolHook = () => renderHook(() => useGetInfiniteSchool(
    { keyword: 'test' },
  ), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetSchools as jest.Mock).mockImplementation(() => (
      {
        content: fixtures.school,
        last: given.last,
        first: given.first,
      }
    ));
    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));
  });

  it('returns school data(last, first)', async () => {
    given('school', () => fixtures.school);
    given('last', () => false);
    given('first', () => false);

    const { result } = renderUseGetSchoolHook();

    await waitFor(() => {
      expect(result.current.schoolData).toEqual(fixtures.school);
    });
  });

  it('returns school data(no last, no first)', async () => {
    given('school', () => fixtures.school);
    given('last', () => true);
    given('first', () => true);

    const { result } = renderUseGetSchoolHook();

    await waitFor(() => {
      expect(result.current.schoolData).toEqual(fixtures.school);
    });
  });
});
