import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import fixtures from '@/fixtures';
import ApiService, { apiService } from '@/lib/api/ApiService';

describe('ApiService', () => {
  let mockApiService: ApiService;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mockApiService = new ApiService();
  });

  it('apiService', () => {
    expect(apiService).not.toBeNull();
  });

  describe('fetchGetSchools', () => {
    it('returns schools', async () => {
      mock.onGet('/school/search').reply(200, { content: fixtures.school });

      const schools = await mockApiService.fetchGetSchools({ keyword: 'test' });

      expect(schools).toEqual(fixtures.school);
    });
  });
});
