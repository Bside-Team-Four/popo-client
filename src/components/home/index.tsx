import { useCallback, useState } from 'react';

import styled from 'styled-components';

import PollPopup from '@/components/popup/PollPopup';
import PoPoState from '@/types/PoPoState';

import PoPoImage from './PoPoImage';
import PoPoTitle from './PoPoTitle';
import VoteButton from './VoteButton';

type HomeProps = {
  currentPoPoState: PoPoState
};

export default function Home({ currentPoPoState }: HomeProps) {
  const [popoState, setPopoState] = useState<PoPoState>(currentPoPoState);
  const [showPollPopup, setShowPollPopup] = useState(false);

  const openPollPopup = useCallback(() => {
    setShowPollPopup(true);
  }, []);

  const onClosePollPopup = useCallback(() => {
    setShowPollPopup(false);
  }, []);

  return (
    <Container>
      <PoPoTitle state={popoState} setState={setPopoState} />
      <PoPoImage state={popoState} />
      <VoteButton state={popoState} openPollPopup={openPollPopup} />
      {showPollPopup && <PollPopup onClose={onClosePollPopup} />}
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
