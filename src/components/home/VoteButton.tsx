import styled from 'styled-components';

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
