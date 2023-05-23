import { getSession } from 'next-auth/react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import fixtures from '@/fixtures';
import ApiService, { apiService } from '@/lib/api/ApiService';

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

describe('ApiService', () => {
  let mockApiService: ApiService;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mockApiService = new ApiService();
    (getSession as jest.Mock).mockImplementation(() => Promise.resolve(given.user));
  });

  it('apiService', () => {
    expect(apiService).not.toBeNull();
  });

  describe('error test', () => {
    it('Status가 400~500이고 메세지가 있을 때는 에러메세지를 띄움.', async () => {
      let error = null;
      mock.onGet('/test').reply(400, { code: 400, message: '에러!!!' });

      try {
        await mockApiService.get('/test');
      } catch (e:any) {
        error = e.message;
      }

      expect(error).toEqual('에러!!!');
    });

    it('Status가 400~500이고 에러 메세지가 없을 때는 기본 에러메세지를 띄움.', async () => {
      let error = null;
      mock.onGet('/test').reply(400);

      try {
        await mockApiService.get('/test');
      } catch (e:any) {
        error = e.message;
      }

      expect(error).toEqual('알 수 없는 에러가 발생했어요. 다시 시도해주세요.');
    });

    it('Status가 200~300이고 에러 메세지가 없을 때는 기본 에러메세지를 띄움.', async () => {
      let error = null;
      mock.onGet('/test').reply(200, { code: 400, message: '에러!!!' });

      try {
        await mockApiService.get('/test');
      } catch (e:any) {
        error = e.message;
      }

      expect(error).toEqual('에러!!!');
    });
  });

  describe('authenticate', () => {
    it('사용자 인증이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/user/authenticate').reply(200, { ...fixtures.authenticate });

      const data = await mockApiService.authenticate({ email: 'test@test.com', password: '1234' });

      expect(data).toEqual(fixtures.authenticate);
    });

    it('사용자 인증이 실패할 경우 value값이 없는 데이터를 리턴한다.', async () => {
      mock.onPost('/user/authenticate').reply(200, { ...fixtures.authenticate, value: null });

      const data = await mockApiService.authenticate({ email: 'test@test.com', password: '1234' });

      expect(data.value).toBeNull();
    });
  });

  describe('fetchGetSchools', () => {
    it('Fetch가 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onGet('/school/search').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.fetchGetSchools({ keyword: 'test', page: 0 });

      expect(data.message).toEqual('ok');
    });
  });

  describe('passwordMissing', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/password/missing').reply(200, { code: 0, value: { userId: 100 } });

      const data = await mockApiService.passwordMissing({ email: 'popo@gmail.com' });

      expect(data.value.userId).toEqual(100);
    });
  });

  describe('passwordMissingAuth', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/password/missing/auth').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.passwordMissingAuth({ userId: 100, userCode: '123456' });

      expect(data.message).toEqual('ok');
    });
  });

  describe('passwordReset', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/password/reset').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.passwordReset({ userId: 100, toChangePassword: '12345678A' });

      expect(data.message).toEqual('ok');
    });
  });

  describe('signUpSendEmail', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/user/sign-up/send/email').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.signUpSendEmail({ email: 'popo@gmail.com' });

      expect(data.message).toEqual('ok');
    });
  });

  describe('signUpAuthEmail', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/user/sign-up/auth/email').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.signUpAuthEmail({ email: 'popo@gmail.com', userCode: '123456' });

      expect(data.message).toEqual('ok');
    });
  });

  describe('signUp', () => {
    it('요청이 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onPost('/user/sign-up').reply(200, { code: 0, message: 'ok' });

      const data = await mockApiService.signUp(fixtures.signupUser);

      expect(data.message).toEqual('ok');
    });
  });

  describe('fetchGetPollStatus', () => {
    it('Fetch가 성공할 경우 데이터를 리턴한다.', async () => {
      given('user', () => ({ accessToken: 'aabbcc' }));
      mock.onGet('/poll/status').reply(200, { code: 0, value: { status: 'START' } });

      const data = await mockApiService.fetchGetPollStatus();

      expect(data.value.status).toEqual('START');
    });
  });

  describe('fetchMyProfile', () => {
    it('Fetch가 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onGet('/user/my').reply(200, { code: 0, value: fixtures.profile });

      const data = await mockApiService.fetchMyProfile();

      expect(data.value).toEqual(fixtures.profile);
    });
  });

  describe('fetchPollList', () => {
    it('Fetch가 성공할 경우 데이터를 리턴한다.', async () => {
      mock.onGet('/poll').reply(200, { code: 0, value: { polls: fixtures.polls } });

      const data = await mockApiService.fetchPollList();

      expect(data.value.polls).toEqual(fixtures.polls);
    });
  });
});
