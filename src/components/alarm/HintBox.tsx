'use client';

import { useState } from 'react';

import styled from 'styled-components';

import Button from '@/components/common/Button';
import { b1Font } from '@/styles/fontStyles';

type HintProps = {
  hintTitle: string;
  hintContent: string;
  hintId: number;
};

export default function HintBox({ hintData }: { hintData: HintProps[] }) {
  const HINT_SIZE = hintData.length;
  const [curHintIdx, setCurHintIdx] = useState(1);

  const handleShowMore = (): void => {
    setCurHintIdx((prevCount) => (prevCount < HINT_SIZE ? prevCount + 1 : prevCount));
  };

  const hintDisplayStyle = (i: number) => ({
    display: curHintIdx <= i ? 'none' : 'block',
  });

  const moreButtonStyle = {
    display: curHintIdx === HINT_SIZE ? 'none' : 'block',
  };

  return (
    <Container>
      {hintData.map((hintItem: HintProps, i: number) => (
        <B1 key={hintItem.hintId} style={hintDisplayStyle(i)}>
          {`${hintItem.hintTitle} : ${hintItem.hintContent}`}
        </B1>
      ))}
      <Button onClick={handleShowMore} customStyle={moreButtonStyle}>더보기</Button>
    </Container>
  );
}

const Container = styled.div`
  margin: 12px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 18px;
  gap: 12px;

  border: 1px solid #e4e4e4;
  filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.06));
  border-radius: 8px;
`;

const B1 = styled.div`
  ${b1Font};
  color: ${({ theme }) => theme.color.black};
`;

Container.defaultProps = {
  onClick: () => {},
  style: {},
};
