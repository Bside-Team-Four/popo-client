import { useState } from 'react';

import styled from 'styled-components';

import Hint from '@/types/Hint';

type HintBoxProps = {
  hintData: Hint[];
};

export default function HintBox({ hintData }: HintBoxProps) {
  const mainHint = hintData[0];
  const otherHints = hintData.slice(1);

  const [mainHintOpen, setMainHintOpen] = useState(false);
  const [otherHintOpen, setOtherHintOpen] = useState({ open: false, index: 0 });

  const openMainHint = () => {
    setMainHintOpen(true);
  };

  const openOtherHint = () => {
    setOtherHintOpen({ open: true, index: otherHintOpen.index + 1 });
  };

  const getHintText = (hint: Hint) => `${hint.hintTitle} : ${hint.hintContent}`;

  return (
    <Container>
      <HintOpenButton onClick={openMainHint} disabled={mainHintOpen}>힌트 보기</HintOpenButton>
      {mainHintOpen && (<HintText>{getHintText(mainHint)}</HintText>)}
      {otherHintOpen.open && otherHints.map((otherHint) => ((
        <HintText key={otherHint.hintId}>
          {getHintText(otherHint)}
        </HintText>
      )))}
      {mainHintOpen && otherHintOpen.index < otherHints.length && (
      <MoreButton onClick={openOtherHint}>더보기...</MoreButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.06));
  border-radius: 8px;
`;

const HintText = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.black};
`;

const HintOpenButton = styled.button`
  all: unset;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const MoreButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;
