import { renderHook } from '@testing-library/react';

import useResizeViewportHeight from './useResizeViewportHeight';

describe('useResizeViewportHeight', () => {
  it('documentElement 전역 style 에 "--vh"변수가 존재해야만 한다', () => {
    renderHook(useResizeViewportHeight);

    expect(document.documentElement.style).toContain('--vh');
  });
});
