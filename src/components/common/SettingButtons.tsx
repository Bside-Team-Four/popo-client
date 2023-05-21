import styled from 'styled-components';

import Button from '@/components/common/Button';

type SettingButtonsProps = {
  isSetting: boolean;
  onClick: () => void;
  onSkip:() => void;
};

export default function SettingButtons({ isSetting, onClick, onSkip }:SettingButtonsProps) {
  return (
    <Container>
      <Button onClick={onClick} disabled={!isSetting}>확인</Button>
      <SkipButton onClick={onSkip}>다음에 할래요</SkipButton>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 24px;
  bottom: 44px;
`;

const SkipButton = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  text-decoration: underline;
  color: ${({ theme }) => theme.color.text.title01};
  margin-top: 10px;
`;
