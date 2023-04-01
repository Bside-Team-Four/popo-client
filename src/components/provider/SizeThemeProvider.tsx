'use client';

import { ReactNode, useEffect, useState } from 'react';

import _ from 'lodash/fp';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/GlobalStyle';
import lightTheme from '@/styles/theme';
import Size from '@/types/Size';

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const getInnerHeight = (): number => {
  if (iOS) {
    return window.outerHeight;
  }
  return window.innerHeight;
};

const getInnerWidth = (): number => {
  if (iOS) {
    return window.outerWidth <= 430 ? window.outerWidth : 430;
  }
  return window.innerWidth <= 430 ? window.innerWidth : 430;
};
const getSize = ():Size => ({
  width: getInnerWidth(),
  height: getInnerHeight(),
});

function SizeThemeProvider({ children }: { children: ReactNode }) {
  const [size, setSize] = useState<Size>(getSize());

  useEffect(() => {
    const handleSize = _.debounce(100, () => {
      setSize(getSize());
    });

    window.addEventListener('resize', handleSize);
    window.addEventListener('orientationchange', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
      window.removeEventListener('orientationchange', handleSize);
    };
  }, []);

  return (
    <ThemeProvider theme={{ ...lightTheme, size }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default SizeThemeProvider;
