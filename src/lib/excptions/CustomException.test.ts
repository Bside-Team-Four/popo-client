import CustomException from '@/lib/excptions/CustomException';

describe('CustomException', () => {
  const createException = (message:string) => new CustomException(message);

  it('Custom Exception Test', () => {
    const data = createException('test');

    expect(data.code).toBe('NETWORK_ERROR');
    expect(data.message).toBe('test');
  });
});
