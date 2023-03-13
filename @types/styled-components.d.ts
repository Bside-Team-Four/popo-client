import type { CSSProp } from 'styled-components';

import lightTheme from '../src/styles/theme';

type ThemeType = typeof lightTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp<T>;
  }
}
