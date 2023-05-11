import Image from 'next/image';

import styled from 'styled-components';

import usePOPOState from '@/hooks/recoil/usePOPOState';

export default function POPOImage() {
  const { popoState } = usePOPOState();

  if (popoState === 'sleep') {
    return <SleepImage src="/images/popo-sleep.svg" width={272} height={212} alt="popo-sleep-image" priority />;
  }

  if (popoState === 'done') {
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
