'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

export default function MainLayout({ children }:PropsWithChildren) {
  return (
    <ContentWrapper>
      {children}
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 84px);
  position: relative;
`;
