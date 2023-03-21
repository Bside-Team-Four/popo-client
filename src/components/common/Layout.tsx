'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import useResizeViewportHeight from '@/hooks/useResizeViewportHeight';

export default function Layout({ children }:PropsWithChildren) {
  useResizeViewportHeight();

  return (
    <LayoutWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.color.grayscale.soft};
`;

const ContentWrapper = styled.div`
  width: auto;
  max-width: 430px;
  height: auto;
  min-height: calc(var(--vh, 1vh) * 100);
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  margin: 0 auto;
  padding: 24px;
  &::before {
    z-index: 10;
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 1px solid #D2C6C6;
  }
  &::after {
    z-index: 10;
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #D2C6C6;
  }
  @media (max-width: 430px) {
    width: 100%;
    max-width: initial;
    &::before {
      content: none;
    }
    &::after {
      content: none;
    }
  }
`;
