import { PropsWithChildren, ReactElement } from 'react';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import fixtures from '@/fixtures';
import defaultTheme from '@/styles/defaultTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

function MockProvider({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <ReactQueryWrapper>
      <RecoilRoot>
        <ThemeProvider theme={{ ...defaultTheme, size: fixtures.theme.size }}>
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </ReactQueryWrapper>
  );
}

export default MockProvider;
