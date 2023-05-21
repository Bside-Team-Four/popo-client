import { targetFalseThenValue } from '@/utils/utils';

describe('utils', () => {
  describe('targetFalseThenValue', () => {
    const value = 'result';

    context('target이 false인 경우', () => {
      it('value를 그대로 반환해야만 한다', () => {
        const result = targetFalseThenValue(false)(value);

        expect(result).toBe(value);
      });
    });

    context('target이 true인 경우', () => {
      it('undefined를 반환해야만 한다', () => {
        const result = targetFalseThenValue(true)(value);

        expect(result).toBeUndefined();
      });
    });
  });
});
