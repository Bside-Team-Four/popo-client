import { renderHook, waitFor } from '@testing-library/react';

import fixtures from '@/fixtures';
import useGetSchools from '@/hooks/api/useGetSchools';
import { apiService } from '@/lib/api/ApiService';
import wrapper from '@/test/ReactQueryWrapper';

jest.mock('@/lib/api/ApiService');

describe('useGetSchool', () => {
  const renderUseGetSchoolHook = () => renderHook(() => useGetSchools({ keyword: 'test' }), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (apiService.fetchGetSchools as jest.Mock).mockImplementation(() => fixtures.school);
  });

  it('returns school data', async () => {
    given('school', () => fixtures.school);

    const { result } = renderUseGetSchoolHook();

    await waitFor(() => {
      expect(result.current.schoolData).toEqual(fixtures.school);
    });
  });
});
