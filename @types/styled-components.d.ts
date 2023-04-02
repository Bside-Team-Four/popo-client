import type { CSSProp } from 'styled-components';

import defaultTheme from '@/styles/defaultTheme';
import Size from '@/types/Size';

type ThemeType = typeof defaultTheme;

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
