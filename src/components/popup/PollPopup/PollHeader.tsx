import Image from 'next/image';

import styled from 'styled-components';

import { getRatioSizePX } from '@/utils/sizeHelper';

type PollHeaderProps = {
  currentStep: number;
  stepCount: number;
  onClosePollPopup: () => void;
};

export default function PollHeader({ currentStep, stepCount, onClosePollPopup }:PollHeaderProps) {
  const stepCheckText = `${currentStep + 1} / ${stepCount}`;

  return (
    <Container>
      <EmptyDiv />
      <StepCheckText>
        {stepCheckText}
      </StepCheckText>
      <CloseIcon onClick={onClosePollPopup} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  height: ${getRatioSizePX(44)};
  margin-bottom: 76px;
`;

const StepCheckText = styled.span`
  display: flex;
  height: 44px;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.color.white};
`;

const CloseIcon = styled(Image).attrs({
  src: '/images/close-icon.svg',
  width: 36,
  height: 36,
  priority: true,
  alt: 'close icon',
})``;

const EmptyDiv = styled.div`
  width: 36px;
  height: 36px;
`;
