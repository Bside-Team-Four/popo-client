import { useCallback } from 'react';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

import { getRatioSizePX } from '@/utils/sizeHelper';

import OptionButton from './OptionButton';

type OptionButtonsProps = {
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
  onSkip:()=>void;
};

export default function OptionButtons({
  isChanged, setIsChanged, onSkip,
}:OptionButtonsProps) {
  const { isDarkMode } = useDarkMode();

  const onClickShuffle = useCallback(() => {
    setIsChanged(true);
  }, [setIsChanged]);

  return (
    <ButtonsContainer>
      <OptionButton
        imgSrc={isDarkMode ? '/images/shuffle-icon-dark.svg' : '/images/shuffle-icon.svg'}
        size={{ width: 48, height: 48 }}
        disabled={isChanged}
        text="바꾸기"
        onClick={onClickShuffle}
      />
      <OptionButton
        imgSrc={isDarkMode ? '/images/skip-icon-dark.svg' : '/images/skip-icon.svg'}
        size={{ width: 28, height: 28 }}
        text="건너뛰기"
        onClick={onSkip}
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
  padding: 0 16px;
`;
