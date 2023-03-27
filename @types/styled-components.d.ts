import type { CSSProp } from 'styled-components';

import Size from '@/types/Size';

import lightTheme from '../src/styles/theme';

type ThemeType = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    size: Size;
  }
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp<T>;
  }
}
