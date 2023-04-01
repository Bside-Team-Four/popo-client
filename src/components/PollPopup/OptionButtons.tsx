import { useCallback } from 'react';

import styled from 'styled-components';

import { getRatioSizePX } from '@/utils/sizeHelper';

import OptionButton from './OptionButton';

type OptionButtonsProps = {
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
  goNextStep:()=>void;
};

export default function OptionButtons({
  isChanged, setIsChanged, goNextStep,
}:OptionButtonsProps) {
  const onClickShuffle = useCallback(() => {
    setIsChanged(true);
  }, [setIsChanged]);

  const onClickSkip = useCallback(() => {
    // TODO: /vote/skip post
    goNextStep();
  }, [goNextStep]);

  return (
    <ButtonsContainer>
      <OptionButton
        imgSrc="/images/shuffle_icon.svg"
        size={{ width: 48, height: 48 }}
        disabled={isChanged}
        text="바꾸기"
        onClick={onClickShuffle}
      />
      <OptionButton
        imgSrc="/images/skip_icon.svg"
        size={{ width: 28, height: 28 }}
        text="건너뛰기"
        onClick={onClickSkip}
      />
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${getRatioSizePX(76)};
  align-items: center;
  justify-content: space-between;
  padding: 14px;
`;
