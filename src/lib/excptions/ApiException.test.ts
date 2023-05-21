import ApiException from '@/lib/excptions/ApiException';
import { ApiErrorScheme } from '@/lib/excptions/type';

describe('ApiException', () => {
  const createException = (data:ApiErrorScheme, code:number) => new ApiException(data, code);

  it('Api Exception Test', () => {
    const data = createException({ message: 'test' }, 400);

    expect(data.code).toBe(400);
    expect(data.message).toBe('test');
  });
});
