import { getDefaultPopInfo } from './PopInfo';

describe('PopInfo', () => {
  it('getDefaultPopInfo', () => {
    const data = getDefaultPopInfo();

    expect(data).toEqual({
      show: false,
      title: '',
      okText: '',
      onClose: expect.any(Function),
    });
  });
});
