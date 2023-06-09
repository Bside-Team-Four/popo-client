'use client';

import { ReactNode, useEffect, useState } from 'react';

import _ from 'lodash/fp';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useDarkMode } from 'usehooks-ts';

import darkTheme from '@/styles/darkTheme';
import defaultTheme from '@/styles/defaultTheme';
import GlobalStyle from '@/styles/GlobalStyle';
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

  const { isDarkMode } = useDarkMode();

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

  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={{ ...theme, size }}>
      <Reset />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default SizeThemeProvider;
