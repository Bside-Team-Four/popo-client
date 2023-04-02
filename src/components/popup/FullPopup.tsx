import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { getAppWidth } from '@/utils/sizeHelper';

import Portal from './Portal';

export default function FullPopup({ children }: PropsWithChildren) {
  return (
    <Portal>
      <InnerContainer>
        {children}
      </InnerContainer>
    </Portal>
  );
}

const InnerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${getAppWidth}px;
  height: 100%;
  top: 0;
`;
