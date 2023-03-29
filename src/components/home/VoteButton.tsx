import styled from 'styled-components';

import RabbitState from '@/types/RabbitState';
import { getRatioSizePX } from '@/utils/sizeHelper';

type VoteButtonProps = {
  rabbitState: RabbitState
};

const getButtonText = (state: RabbitState) => {
  if (state === 'sleep') {
    return 'PoPo 자는 중';
  }
  if (state === 'done') {
    return 'PoPo 쉬는 중';
  }
  return '시작하기';
};

export default function VoteButton({ rabbitState }: VoteButtonProps) {
  const buttonText = getButtonText(rabbitState);

  return (
    <Container type="button" disabled={rabbitState !== 'start'}>
      {buttonText}
    </Container>
  );
}

const Container = styled.button`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: ${getRatioSizePX(67)};
  border-radius: 20px;
  border: none;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.main};
  &:active {
    background-color: #6A4ED7;
  }
  &:disabled {
    background-color: #F9F8F9;
    color: #B3B3B3;
  }
`;
