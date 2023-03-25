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
    font-family: Pretendard,sans-serif;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
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
