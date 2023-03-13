import { ReactElement, ReactNode } from 'react';

import lightTheme from 'src/styles/theme';
import { ThemeProvider } from 'styled-components';

interface Props {
  theme?: typeof lightTheme;
  children: ReactNode;
}

function MockTheme({ theme = lightTheme, children }: Props): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;
