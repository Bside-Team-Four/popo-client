import Image from 'next/image';

import styled from 'styled-components';

import PoPoState from '@/types/PoPoState';

type PoPoImageProps = {
  state: PoPoState
};

export default function PoPoImage({ state }:PoPoImageProps) {
  if (state === 'sleep') {
    return <SleepImage src="/images/popo-sleep.svg" width={272} height={212} alt="popo-sleep-image" priority />;
  }

  if (state === 'done') {
    return <DoneImage src="/images/popo-done.svg" width={256} height={151} alt="popo-done-image" priority />;
  }

  return (
    <StartImage src="/images/popo-start.svg" width={295} height={421} alt="popo-start-image" priority />
  );
}

const SleepImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 24px;
`;

const DoneImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 24px;
`;

const StartImage = styled(Image)`
  position: absolute;
`;
