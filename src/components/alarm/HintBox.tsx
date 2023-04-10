'use client';

import { useState } from 'react';

import styled from 'styled-components';

import { b1Font } from '@/styles/fontStyles';
import Hint from '@/types/Hint';

export default function HintBox({ hintData }: { hintData: Hint[] }) {
  const HINT_SIZE = hintData.length;
  const [curHintIdx, setCurHintIdx] = useState(0);

  const handleIsVisible = (): void => {
    setCurHintIdx((prevCount) => (prevCount < HINT_SIZE ? prevCount + 1 : prevCount));
  };

  return (
    <Container>
      <B1Primary onClick={handleIsVisible}>힌트 보기</B1Primary>
      {hintData.map(
        (hintItem: Hint, i: number) => curHintIdx > i && (
        <B1 data-testid="hint-button" key={hintItem.hintId}>
          {`${hintItem.hintTitle} : ${hintItem.hintContent}`}
        </B1>
        ),
      )}
      {curHintIdx !== 0 && curHintIdx !== HINT_SIZE && (
        <MoreButton onClick={handleIsVisible}>더보기...</MoreButton>
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

const B1 = styled.div`
  ${b1Font};
  color: ${({ theme }) => theme.color.black};
`;

const B1Primary = styled.button`
  all: unset;
  ${b1Font};
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const MoreButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;
