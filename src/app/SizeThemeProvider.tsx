'use client';

import { ReactNode, useEffect, useState } from 'react';

import _ from 'lodash/fp';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/GlobalStyle';
import lightTheme from '@/styles/theme';
import Size from '@/types/Size';

const getInnerHeight = (isIos:boolean): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  if (isIos) {
    return window.outerHeight;
  }
  return window.innerHeight;
};
const getInnerWidth = (isIos:boolean): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  if (isIos) {
    return window.outerWidth;
  }
  return window.innerWidth;
};

const getSize = (isIos:boolean):Size => ({
  width: getInnerWidth(isIos),
  height: getInnerHeight(isIos),
});

function SizeThemeProvider({ children }: { children: ReactNode }) {
  const [isIos, setIsIos] = useState<boolean>(false);
  const [size, setSize] = useState<Size>(getSize(isIos));

  useEffect(() => {
    const { userAgent } = navigator;
    if (navigator.userAgent) {
      setIsIos(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    }
  }, []);

  useEffect(() => {
    const handleSize = _.debounce(100, () => { setSize(getSize(isIos)); });
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleSize);
      window.addEventListener('orientationchange', handleSize);
    }

    return () => {
      window.removeEventListener('resize', handleSize);
      window.removeEventListener('orientationchange', handleSize);
    };
  }, [isIos]);

  return (
    <ThemeProvider theme={{ ...lightTheme, size }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default SizeThemeProvider;
