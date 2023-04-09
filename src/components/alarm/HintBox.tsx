'use client';

import { useState } from 'react';

import styled from 'styled-components';

// import Button from '@/components/common/Button';
import { b1Font } from '@/styles/fontStyles';

type HintProps = {
  hintTitle: string;
  hintContent: string;
  hintId: number;
};

export default function HintBox({ hintData }: { hintData: HintProps[] }) {
  const HINT_SIZE = hintData.length;
  const [curHintIdx, setCurHintIdx] = useState(0);

  const handleShowMore = (): void => {
    setCurHintIdx((prevCount) => (prevCount < HINT_SIZE ? prevCount + 1 : prevCount));
  };

  const hintDisplayStyle = (i: number) => ({
    display: curHintIdx <= i ? 'none' : 'block',
  });

  const moreButtonStyle = {
    display: curHintIdx === 0 || curHintIdx === HINT_SIZE ? 'none' : 'block',
  };

  return (
    <Container>
      <B1Primary data-testid="hint-button" onClick={handleShowMore}>
        힌트 보기
      </B1Primary>
      {hintData.map((hintItem: HintProps, i: number) => (
        <B1 key={hintItem.hintId} style={hintDisplayStyle(i)}>
          {`${hintItem.hintTitle} : ${hintItem.hintContent}`}
        </B1>
      ))}
      <MoreButton onClick={handleShowMore} style={moreButtonStyle}>
        더보기...
      </MoreButton>
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
  ${b1Font};
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const MoreButton = styled.div``;

Container.defaultProps = {
  onClick: () => {},
  style: {},
};
