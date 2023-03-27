import { ReactElement, ReactNode } from 'react';

import lightTheme from 'src/styles/theme';
import { ThemeProvider } from 'styled-components';

import Size from '@/types/Size';

interface Props {
  theme?: typeof lightTheme;
  size: Size
  children: ReactNode;
}

function MockTheme({ theme = lightTheme, size, children }: Props): ReactElement {
  return (
    <ThemeProvider theme={{ ...theme, size }}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;
