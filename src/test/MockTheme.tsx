import { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';

import fixtures from '@/fixtures';
import defaultTheme from '@/styles/defaultTheme';
import Size from '@/types/Size';

interface Props {
  theme?: typeof defaultTheme;
  size?: Size
  children: ReactNode;
}

function MockTheme({
  theme = defaultTheme,
  size = fixtures.theme.size,
  children,
}: Props): ReactElement {
  return (
    <ThemeProvider theme={{ ...theme, size }}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;
