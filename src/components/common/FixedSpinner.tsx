import styled from 'styled-components';

import SpinnerType from '@/types/SpinnerType';

import Spinner from './Spinner';

type FixedSpinnerProps = {
  type:SpinnerType;
  opacity?: number;
};

export default function FixedSpinner({ type, opacity = 1 }: FixedSpinnerProps) {
  return (
    <Container opacity={opacity}>
      <Spinner type={type} />
    </Container>
  );
}

const Container = styled.div<{ opacity:number }>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  opacity: ${({ opacity }) => opacity};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
`;
