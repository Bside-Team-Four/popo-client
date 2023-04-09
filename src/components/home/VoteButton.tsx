import styled from 'styled-components';

import Button from '@/components/common/Button';
import usePoPoState from '@/hooks/recoil/usePoPoState';

type VoteButtonProps = {

  openPollPopup:() => void;
};

export default function VoteButton({ openPollPopup }: VoteButtonProps) {
  const { popoState } = usePoPoState();

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
