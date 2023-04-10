import { renderHook } from '@testing-library/react';

import fixtures from '@/fixtures';
import MockTheme from '@/test/MockTheme';

import {
  getAppHeight, getAppWidth, getCalAppWidth,
  getRatioSizePX, useAppHeight, useAppWidth, useGetRatioSize,
} from './sizeHelper';

describe('sizeHelper', () => {
  const renderMockThemeHook = (func: () => number) => renderHook(
    () => func(),
    {
      wrapper: ({ children }) => (
        <MockTheme>
          {children}
        </MockTheme>
      ),
    },
  );

  it('getAppWidth returns app width', () => {
    expect(getAppWidth({ theme: fixtures.theme })).toBe(320);
  });

  it('getAppHeight returns app height', () => {
    expect(getAppHeight({ theme: fixtures.theme })).toBe(480);
  });

  it('getRatioSizePX returns ratio size px', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = getRatioSizePX(100)({ theme: fixtures.theme });

    expect(result).toBe('74.4186046511628px');
  });

  it('useAppWidth returns app width', () => {
    const { result } = renderMockThemeHook(useAppWidth);

    expect(result.current).toBe(320);
  });

  it('useAppHeight returns app height', () => {
    const { result } = renderMockThemeHook(useAppHeight);

    expect(result.current).toBe(480);
  });

  it('useAppRatioSize returns app height', () => {
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

  it('getCalAppWidth returns cal appwidth', () => {
    const result = getCalAppWidth((width) => width / 430)({ theme: fixtures.theme });

    expect(result).toBe(0.7441860465116279);
  });
});
