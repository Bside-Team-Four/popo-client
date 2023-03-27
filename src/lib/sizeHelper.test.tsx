import { renderHook } from '@testing-library/react';

import MockTheme from '@/utils/test/MockTheme';

import {
  getAppHeight, getAppWidth, getRatioSize, useAppHeight, useAppWidth,
} from './sizeHelper';

const fixtureTheme = {
  theme: {
    size: {
      width: 320,
      height: 480,
    },
  },
};

describe('sizeHelper', () => {
  const renderMockThemeHook = (func: () => number) => renderHook(
    () => func(),
    {
      wrapper: ({ children }) => (
        <MockTheme
          size={fixtureTheme.theme.size}
        >
          {children}
        </MockTheme>
      ),
    },
  );

  context('getAppWidth', () => {
    it('returns app width', () => {
      expect(getAppWidth(fixtureTheme)).toBe(320);
    });
  });
  context('getAppHeight', () => {
    it('returns app height', () => {
      expect(getAppHeight(fixtureTheme)).toBe(480);
    });
  });
  context('getRatioSize', () => {
    it('returns ratio size', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = getRatioSize(100)(fixtureTheme);
      expect(result).toBe('44.44444444444444px');
    });
  });
  context('useAppWidth', () => {
    it('returns app width', () => {
      const { result } = renderMockThemeHook(useAppWidth);

      expect(result.current).toBe(320);
    });
  });
  context('useAppHeight', () => {
    it('returns app height', () => {
      const { result } = renderMockThemeHook(useAppHeight);

      expect(result.current).toBe(480);
    });
  });
});
