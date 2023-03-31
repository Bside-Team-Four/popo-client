import { useCallback, useEffect, useState } from 'react';

import { useAnimate } from 'framer-motion';
import styled from 'styled-components';

import Candidate from '@/types/Candidate';
import { getRatioSizePX } from '@/utils/sizeHelper';

import CandidateItem from './CandidateItem';

type CandidateListProps = {
  currentStep: number;
  isChanged: boolean;
  candidates: Candidate[];
  goNextStep: () => void;
};

const getCandidateData = (candidates: Candidate[], isChanged = false) => {
  const candidatesMaxCount = candidates.length > 4 ? 8 : 4;

  const emptyCandidates = Array(candidatesMaxCount - candidates.length)
    .fill({ userId: 0, name: '' });

  if (isChanged) {
    return [...candidates, ...emptyCandidates].slice(4, 8);
  }

  return [...candidates, ...emptyCandidates].slice(0, 4);
};

export default function CandidateList({
  currentStep, isChanged, candidates, goNextStep,
}:CandidateListProps) {
  const [candidateData, setCandidateData] = useState<Candidate[]>(getCandidateData(candidates));
  const [divRef, animate] = useAnimate();

  const candidateOnClick = (candidate: Candidate) => {
    if (candidate.userId === 0) {
      // TODO: /vote/skip post
    }
    // TODO: /vote post
    goNextStep();
  };

  const onChangeAnimation = useCallback(async () => {
    await animate(divRef.current, { opacity: 0, x: -20 }, { duration: 0.5 });

    setCandidateData(getCandidateData(candidates, isChanged));

    animate(divRef.current, { opacity: 1, x: 0 }, { duration: 0 });
  }, [animate, candidates, divRef, isChanged]);

  useEffect(() => {
    if (isChanged) {
      onChangeAnimation();
    }
  }, [isChanged, onChangeAnimation]);

  useEffect(() => {
    setCandidateData(getCandidateData(candidates));
  }, [currentStep, candidates]);

  return (
    <Container ref={divRef}>
      {candidateData.map((candidate, i) => (
        <CandidateItem
          key={`${candidate.userId}-${i}`}
          candidate={candidate}
          onClick={() => candidateOnClick(candidate)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${getRatioSizePX(196)};
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;
