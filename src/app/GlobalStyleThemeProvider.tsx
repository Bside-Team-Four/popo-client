'use client';

import { ReactNode } from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import lightTheme from '../styles/theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
  button {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;

function GlobalStyleThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default GlobalStyleThemeProvider;
