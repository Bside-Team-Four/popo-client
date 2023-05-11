import { useCallback, useState } from 'react';

import styled from 'styled-components';

import PollPopup from '@/components/popup/PollPopup';

import POPOImage from './POPOImage';
import POPOTitle from './POPOTitle';
import VoteButton from './VoteButton';

export default function Home() {
  const [showPollPopup, setShowPollPopup] = useState(false);

  const openPollPopup = useCallback(() => {
    setShowPollPopup(true);
  }, []);

  const onClosePollPopup = useCallback(() => {
    setShowPollPopup(false);
  }, []);

  return (
    <Container>
      <POPOTitle />
      <POPOImage />
      <VoteButton openPollPopup={openPollPopup} />
      <PollPopup show={showPollPopup} onClose={onClosePollPopup} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 24px;
`;
