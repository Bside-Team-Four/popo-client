import { PropsWithChildren } from 'react';

import styled from 'styled-components';

type SmallButtonProps = {
  className?: string;
  onClick: ()=>void;
};

export default function SmallButton({
  className,
  onClick,
  children,
}:PropsWithChildren<SmallButtonProps>) {
  return (
    <Container className={className} onClick={onClick}>
      <Text>{children}</Text>
    </Container>
  );
}

const Container = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.componentBackground.bg01};
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary};
`;
