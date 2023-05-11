import styled from 'styled-components';

import Button from '@/components/common/Button';
import usePOPOState from '@/hooks/recoil/usePOPOState';

type VoteButtonProps = {

  openPollPopup:() => void;
};

export default function VoteButton({ openPollPopup }: VoteButtonProps) {
  const { popoState } = usePOPOState();

  if (popoState !== 'start') {
    return null;
  }

  return (
    <Container onClick={openPollPopup}>
      시작하기
    </Container>
  );
}

const Container = styled(Button)`
  position: absolute;
  bottom: 24px;
  width: calc(100% - 48px);
`;
