import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  
  * {
    box-sizing: border-box;
    font-family: var(--font-pretendard);
  }
  body {
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

export default GlobalStyle;
