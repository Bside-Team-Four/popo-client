import styled from 'styled-components';

import Button from '@/components/common/Button';
import usePollStatus from '@/hooks/recoil/usePollStatus';

type VoteButtonProps = {

  openPollPopup:() => void;
};

export default function VoteButton({ openPollPopup }: VoteButtonProps) {
  const { pollStatus } = usePollStatus();

  if (pollStatus !== 'START') {
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
