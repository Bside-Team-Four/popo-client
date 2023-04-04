import styled from 'styled-components';

import PoPoState from '@/types/PoPoState';

type VoteButtonProps = {
  state: PoPoState;
  openPollPopup:() => void;
};

export default function VoteButton({ state, openPollPopup }: VoteButtonProps) {
  if (state !== 'start') {
    return null;
  }

  return (
    <Container type="button" onClick={openPollPopup}>
      시작하기
    </Container>
  );
}

const Container = styled.button`
  position: absolute;
  bottom: 24px;
  width: calc(100% - 48px);
  height: 56px;
  border: none;
  border-radius: 218px;
  background-color: ${({ theme }) => theme.color.text.title01};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.reverseText};
`;
