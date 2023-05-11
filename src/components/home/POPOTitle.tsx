import styled from 'styled-components';

import usePOPOState from '@/hooks/recoil/usePOPOState';
import usePOPOText from '@/hooks/usePOPOText';
import POPOState from '@/types/POPOState';

const getSubTitleText = (popoState: POPOState) => {
  if (popoState === 'sleep') {
    return '자고 있어';
  }
  if (popoState === 'done') {
    return '곧 시작할거야';
  }
  return '남았어';
};

const getMessageText = (popoState: POPOState) => {
  if (popoState === 'sleep') {
    return '새벽 3시에서 7시에는 잠에 들 시간이야';
  }
  if (popoState === 'done') {
    return '뒤에 봐';
  }
  return '시작하기를 눌러줘';
};

const getTimerText = (timer: { hourText: string; minuteText: string; secondText: string }) => {
  const { hourText, minuteText, secondText } = timer;

  return (
    <>
      <HourNumber>{hourText}</HourNumber>
      :
      <MinuteNumber>{minuteText}</MinuteNumber>
      :
      <SecondNumber>{secondText}</SecondNumber>
    </>
  );
};

export default function POPOTitle() {
  const { popoState } = usePOPOState();
  const { titleText, timer } = usePOPOText();

  return (
    <Container>
      <Title data-testid="title">{titleText}</Title>
      <SubTitleContainer>
        {popoState === 'start' && getTimerText(timer)}
        <SubTitle data-testid="sub-title">{getSubTitleText(popoState)}</SubTitle>
      </SubTitleContainer>
      <MessageContainer data-testid="message">
        {popoState === 'done' && getTimerText(timer)}
        <Message>{getMessageText(popoState)}</Message>
      </MessageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 24px;
`;

const Title = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: 200;
  line-height: 40px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const SubTitleContainer = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: 400;
  line-height: 40px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.text.title01};
  span{
    width: 50px;
  };
`;

const SubTitle = styled.div``;

const MessageContainer = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.text.title02};
  span{
    width: 20px;
  };
`;

const Message = styled.div``;

const HourNumber = styled.span`
  text-align: left;
`;

const MinuteNumber = styled.span`
  text-align: center;
`;
const SecondNumber = styled.span`
  text-align: left;
`;
