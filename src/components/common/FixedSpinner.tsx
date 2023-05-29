import styled from 'styled-components';

import SpinnerType from '@/types/SpinnerType';
import { getAppHeight, getAppWidth } from '@/utils/sizeHelper';

import Spinner from './Spinner';

type FixedSpinnerProps = {
  type:SpinnerType;
  opacity?: number;
};

export default function FixedSpinner({ type, opacity = 1 }: FixedSpinnerProps) {
  return (
    <Container opacity={opacity} data-testid="spinner">
      <Spinner type={type} />
    </Container>
  );
}

const Container = styled.div<{ opacity:number }>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${getAppWidth}px;
  height: ${getAppHeight}px;
  opacity: ${({ opacity }) => opacity};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
`;
