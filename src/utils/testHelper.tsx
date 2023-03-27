import { ReactNode } from 'react';

import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import fixtures from '@/fixtures';
import lightTheme from '@/styles/theme';

export default function renderWithProviders(node: ReactNode) {
  return render((
    <ThemeProvider theme={{ ...lightTheme, size: fixtures.theme.size }}>
      {node}
    </ThemeProvider>
  ));
}
