import { renderHook } from '@testing-library/react';

import fixtures from '@/fixtures';
import MockTheme from '@/test/MockTheme';

import {
  getAppHeight, getAppWidth, getRatioSizePX, useAppHeight, useAppWidth, useGetRatioSize,
} from './sizeHelper';

describe('sizeHelper', () => {
  const renderMockThemeHook = (func: () => number) => renderHook(
    () => func(),
    {
      wrapper: ({ children }) => (
        <MockTheme
          size={fixtures.theme.size}
        >
          {children}
        </MockTheme>
      ),
    },
  );

  context('getAppWidth', () => {
    it('returns app width', () => {
      expect(getAppWidth({ theme: fixtures.theme })).toBe(320);
    });
  });
  context('getAppHeight', () => {
    it('returns app height', () => {
      expect(getAppHeight({ theme: fixtures.theme })).toBe(480);
    });
  });
  context('getRatioSizePX', () => {
    it('returns ratio size px', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = getRatioSizePX(100)({ theme: fixtures.theme });
      expect(result).toBe('74.4186046511628px');
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
  context('useAppRatioSize', () => {
    it('returns app height', () => {
      const { result } = renderHook(
        () => useGetRatioSize(),
        {
          wrapper: ({ children }) => (
            <MockTheme
              size={fixtures.theme.size}
            >
              {children}
            </MockTheme>
          ),
        },
      );

      expect(result.current(100)).toBe(74.4186046511628);
    });
  });
});
