'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

export default function MobileLayout({ children }:PropsWithChildren) {
  return (
    <Container>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.gray02};
`;

const ContentWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 430px;
  max-width: 430px;
  height: auto;
  position: relative;
  background-color: ${({ theme }) => theme.color.background};
  margin: 0 auto;
`;
