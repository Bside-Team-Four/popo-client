import styled from 'styled-components';

import useTimerText from '@/hooks/useTimerText';
import RabbitState from '@/types/RabbitState';
import { getRatioSizePX } from '@/utils/sizeHelper';

type TimerProps = {
  rabbitState: RabbitState;
  setRabbitState: (rabbitState: RabbitState) => void;
};

export default function Timer({ rabbitState, setRabbitState }: TimerProps) {
  const { timerText, timerMessage } = useTimerText(rabbitState, setRabbitState);

  return (
    <Container>
      <TimerText>
        <HourNumber>{timerText.hourText}</HourNumber>
          &nbsp;:
        <MinuteNumber>{timerText.minuteText}</MinuteNumber>
        :&nbsp;
        <SecondNumber>{timerText.secondText}</SecondNumber>
      </TimerText>
      <TimerMessage>{timerMessage}</TimerMessage>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${getRatioSizePX(28)} 0;
`;

const TimerText = styled.div`
  display: flex;
  font-size: ${getRatioSizePX(48)};
  height: ${getRatioSizePX(86)};
  margin-bottom: ${getRatioSizePX(14)};
  color: #1B1928;
  font-weight: 100;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

const Num = styled.span`
  width: ${getRatioSizePX(70)};
  text-align: center;
`;

const HourNumber = styled(Num)`
  text-align: right;
`;

const MinuteNumber = styled(Num)`
  text-align: center;
`;

const SecondNumber = styled(Num)`
  text-align: left;
`;

const TimerMessage = styled.span`
  font-size: ${getRatioSizePX(20)};
  margin-bottom: ${getRatioSizePX(28)};
  color: #1B1928;
  opacity: 0.7;
`;
