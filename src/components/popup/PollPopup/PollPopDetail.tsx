import { useCallback, useState } from 'react';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import fixtures from '@/fixtures';
import Category from '@/types/Category';
import { getCategoryColor } from '@/utils/categoryHelper';

import CandidateList from './CandidateList';
import OptionButtons from './OptionButtons';
import PollHeader from './PollHeader';
import Question from './Question';

type PollPopDetailProps = {
  onClose: ()=>void;
};

export default function PollPopDetail({ onClose }:PollPopDetailProps) {
  const { polls } = fixtures;

  const [currentStep, setCurrentStep] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  const { isDarkMode } = useDarkMode();

  const { categoryName, content, candidates } = polls[currentStep];

  const goNextStep = useCallback(async () => {
    if (currentStep === polls.length - 1) {
      onClose();
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setIsChanged(false);
  }, [currentStep, onClose, polls.length]);

  return (
    <Container
      $category={categoryName}
      $isDarkMode={isDarkMode}
    >
      <PollHeader
        currentStep={currentStep}
        stepCount={polls.length}
        onClose={onClose}
      />
      <Question category={categoryName} content={content} />
      <CandidateList
        isChanged={isChanged}
        candidates={candidates}
        goNextStep={goNextStep}
      />
      <OptionButtons
        isChanged={candidates.length <= 4 || isChanged}
        setIsChanged={setIsChanged}
        goNextStep={goNextStep}
      />
    </Container>
  );
}

const Container = styled.div<{ $isDarkMode:boolean, $category: Category }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 24px;
  background-color: ${getCategoryColor('backgroundColor')};
`;
