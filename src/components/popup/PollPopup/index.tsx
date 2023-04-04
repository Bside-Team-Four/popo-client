import { useCallback, useState } from 'react';

import { motion, useAnimate } from 'framer-motion';
import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import FullPopup from '@/components/popup/FullPopup';
import fixtures from '@/fixtures';
import getCategoryColor from '@/styles/getCategoryColor';
import { useAppHeight } from '@/utils/sizeHelper';

import CandidateList from './CandidateList';
import OptionButtons from './OptionButtons';
import PollHeader from './PollHeader';
import Question from './Question';

type PollPopupProps = {
  onClose:()=>void;
};

export default function PollPopup({ onClose }:PollPopupProps) {
  const { polls } = fixtures;

  const [currentStep, setCurrentStep] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  const [divRef, animate] = useAnimate();
  const { isDarkMode } = useDarkMode();
  const appHeight = useAppHeight();

  const { categoryName, content, candidates } = polls[currentStep];

  const onClosePollPopup = useCallback(async () => {
    await animate(divRef.current, { y: appHeight }, {
      duration: 0.5,
    });
    onClose();
  }, [animate, appHeight, divRef, onClose]);

  const goNextStep = useCallback(async () => {
    if (currentStep === polls.length - 1) {
      await onClosePollPopup();
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setIsChanged(false);
  }, [currentStep, onClosePollPopup, polls.length]);

  return (
    <FullPopup>
      <Container
        ref={divRef}
        $category={categoryName}
        $isDarkMode={isDarkMode}
        animate={{ y: 0 }}
        initial={{ y: appHeight }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
      >
        <PollHeader
          currentStep={currentStep}
          stepCount={polls.length}
          onClosePollPopup={onClosePollPopup}
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
    </FullPopup>
  );
}

const Container = styled(motion.div)<{ $isDarkMode:boolean, $category: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 24px;
  background-color: ${getCategoryColor('backgroundColor')};
`;
