import { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import Timer from '@/components/home/Timer';
import VoteButton from '@/components/home/VoteButton';
import RabbitState from '@/types/RabbitState';
import { getRatioSizePX, useGetRatioSize } from '@/utils/sizeHelper';

import Rabbit from './Rabbit';

type HomeProps = {
  currentRabbitState: RabbitState
};

export default function Home({ currentRabbitState }: HomeProps) {
  const [rabbitState, setRabbitState] = useState<RabbitState>(currentRabbitState);

  const getRatioSize = useGetRatioSize();

  return (
    <Container>
      {rabbitState === 'start'
        ? <TimerIcon width={getRatioSize(64)} height={getRatioSize(64)} />
        : <EmptyDiv data-testid="empty div" />}
      <Timer rabbitState={rabbitState} setRabbitState={setRabbitState} />
      <VoteButton rabbitState={rabbitState} />
      <Rabbit rabbitState={rabbitState} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 24px;
`;

const TimerIcon = styled(Image).attrs({
  src: '/images/timer-icon.svg',
  alt: 'timer icon',
  priority: true,
})`
  margin-top: ${getRatioSizePX(59)};
`;

const EmptyDiv = styled.div`
  margin-top: ${getRatioSizePX(59)};
  width: ${getRatioSizePX(64)};
  height: ${getRatioSizePX(64)};
`;
