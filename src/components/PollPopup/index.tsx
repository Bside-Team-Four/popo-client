import { useCallback, useEffect, useState } from 'react';

import { motion, useAnimate } from 'framer-motion';
import styled from 'styled-components';

import FullPopup from '@/components/popup/FullPopup';
import fixtures from '@/fixtures';
import { useAppHeight } from '@/utils/sizeHelper';

import CandidateList from './CandidateList';
import OptionButtons from './OptionButtons';
import PollHeader from './PollHeader';
import Question from './Question';

type PollPopupProps = {
  onClose:()=>void;
};

export default function PollPopup({ onClose }:PollPopupProps) {
  // TODO /vote get
  const { polls } = fixtures;

  const [currentStep, setCurrentStep] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  const [divRef, animate] = useAnimate();

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

  useEffect(() => () => {
    setCurrentStep(0);
    setIsChanged(false);
  }, []);

  return (
    <FullPopup>
      <Container
        ref={divRef}
        animate={{ y: 0 }}
        initial={{ y: appHeight }}
        transition={{
          type: 'spring',
          duration: 0.7,
        }}
        category={categoryName}
      >
        <PollHeader
          currentStep={currentStep}
          stepCount={polls.length}
          onClosePollPopup={onClosePollPopup}
        />
        <Question category={categoryName} content={content} />
        <CandidateList
          currentStep={currentStep}
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

const categoryBackgroundColor: { [k: string]: string } = {
  romance: '#F7686E',
  friendship: '#EB805D',
  looks: '#ED9A9E',
  school_life: '#45CE8F',
  speciality: '#45CEB9',
  personality: '#24BBC3',
  private: '#5087DE',
  ect02: '#3367D6',
};
const getBackgroundColor = (category: string) => categoryBackgroundColor[category];

const Container = styled(motion.div)<{ category: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 24px;
  background-color: ${({ category }) => getBackgroundColor(category)};
`;
