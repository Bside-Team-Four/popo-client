import Image from 'next/image';

import styled from 'styled-components';

import { getCalAppWidth, getRatioSizePX } from '@/utils/sizeHelper';

type PollHeaderProps = {
  currentStep: number;
  stepCount: number;
  onClose: () => void;
};

export default function PollHeader({ currentStep, stepCount, onClose }:PollHeaderProps) {
  const stepCheckText = `${currentStep + 1} / ${stepCount}`;

  return (
    <Container>
      <EmptyDiv />
      <StepCheckText>
        {stepCheckText}
      </StepCheckText>
      <CloseIcon onClick={onClose} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  height: ${getRatioSizePX(60)};
`;

const StepCheckText = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.color.white};
`;

const CloseIcon = styled(Image).attrs({
  src: '/images/close-icon.svg',
  width: 30,
  height: 30,
  priority: true,
  alt: 'close icon',
})`
  transform: scale(${getCalAppWidth((w) => w / 420)});
`;

const EmptyDiv = styled.div`
  width: 30px;
  height: 30px;
  transform: scale(${getCalAppWidth((w) => w / 420)});
`;
