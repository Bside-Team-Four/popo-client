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

  describe('setToken', () => {
    it('사용자의 토큰 저장', () => {
      mockApiService.setToken('test-token');

      expect(mockApiService.accessToken).toEqual('test-token');
    });
  });

  describe('fetchGetSchools', () => {
    it('returns schools', async () => {
      mock.onGet('/school/search').reply(200, { content: fixtures.school });

      const { data } = await mockApiService.fetchGetSchools({ keyword: 'test', page: 0 });

      expect(data.content).toEqual(fixtures.school);
    });
  });

  describe('authenticate', () => {
    it('사용자 인증이 성공할 경우', async () => {
      mock.onPost('/user/authenticate').reply(200, fixtures.authenticate);

      const data = await mockApiService.authenticate({ email: 'test@test.com', password: '1234' });

      expect(data).toEqual(fixtures.authenticate);
      expect(mockApiService.accessToken).toEqual('test-token');
    });

    it('사용자 인증이 실패할 경우', async () => {
      mock.onPost('/user/authenticate').reply(200, { ...fixtures.authenticate, value: null });

      const data = await mockApiService.authenticate({ email: 'test@test.com', password: '1234' });

      expect(data.value).toBeNull();
    });
  });
});
