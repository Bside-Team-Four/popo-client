import { useCallback, useState } from 'react';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import Category from '@/types/Category';
import Poll from '@/types/Poll';
import { getCategoryColor } from '@/utils/categoryHelper';

import CandidateList from './CandidateList';
import OptionButtons from './OptionButtons';
import PollHeader from './PollHeader';
import Question from './Question';

type PollPopDetailProps = {
  onClose: ()=>void;
  totalQuestionCount: number;
  userCurrentIndex: number;
  polls: Poll[];
};

export default function PollPopDetail({
  onClose, polls, userCurrentIndex, totalQuestionCount,
}:PollPopDetailProps) {
  const [currentStep, setCurrentStep] = useState(userCurrentIndex - 1);
  const [isChanged, setIsChanged] = useState(false);

  const { isDarkMode } = useDarkMode();

  const { categoryName, content, candidates } = polls[currentStep];

  const goNextStep = useCallback(async () => {
    if (currentStep + 1 === totalQuestionCount) {
      onClose();
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setIsChanged(false);
  }, [currentStep, onClose, totalQuestionCount]);

  return (
    <Container
      $category={categoryName}
      $isDarkMode={isDarkMode}
    >
      <PollHeader
        currentStep={currentStep}
        stepCount={totalQuestionCount}
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
