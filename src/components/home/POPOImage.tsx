import Image from 'next/image';

import styled from 'styled-components';

import usePollStatus from '@/hooks/recoil/usePollStatus';

export default function POPOImage() {
  const { pollStatus } = usePollStatus();

  if (pollStatus === 'SLEEP') {
    return <SleepImage src="/images/popo-sleep.svg" width={272} height={212} alt="popo-sleep-image" priority />;
  }

  if (pollStatus === 'DONE') {
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
