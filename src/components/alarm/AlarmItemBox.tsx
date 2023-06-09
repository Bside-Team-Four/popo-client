import styled from 'styled-components';

import ProfileIcon from '@/components/common/ProfileIcon';
import Alarm from '@/types/Alarm';

import HintBox from './HintBox';

type AlarmItemBoxProps = {
  item: Alarm;
};

export default function AlarmItemBox({ item }: AlarmItemBoxProps) {
  return (
    <Container>
      <TopContainer>
        <ProfileIcon
          gender={item.userInfo.gender === '남성' ? 'male' : 'female'}
        />
        <QuestionBox>{item.title}</QuestionBox>
      </TopContainer>
      <MiddleContainer>
        <TextContainer>
          <B3>익명의 투표자</B3>
          <InfoContainer>
            <B3Gray>{`${item.userInfo.gender} | ${item.userInfo.schoolInfo}`}</B3Gray>
          </InfoContainer>
        </TextContainer>
        <TimeContainer>
          <B3Gray>{item.createdAt}</B3Gray>
        </TimeContainer>
      </MiddleContainer>
      {item.hints && (
      <HintBox key={item.hints + item.createdAt} hintData={item.hints} test-id="hint-box" />
      )}
    </Container>
  );
}
const Flexbox = styled.div`
  display: flex;
`;

const Container = styled(Flexbox)`
  background: ${({ theme }) => theme.color.componentBackground.bg01};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  padding: 16px 14px;
  gap: 8px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(40px);
  border-radius: 34px;
  width: 100%
`;
const TopContainer = styled(Flexbox)`
  align-items: flex-end;
  width: 100%;
  gap: 8px;
`;

const MiddleContainer = styled(Flexbox)`
  width: 100%;
  justify-content: space-between;
`;

const TextContainer = styled(Flexbox)`
  flex-direction: column;
  margin-left: 12px;
`;

const InfoContainer = styled(Flexbox)`
  justify-content: flex-start;
  align-items: center;
`;

const TimeContainer = styled(Flexbox)`
  align-items: flex-end;
`;

const QuestionBox = styled.div`
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 6px 12px;
  width: 100%;
  background: ${(props) => props.theme.color.componentBackground.bg02};
  color: ${({ theme }) => theme.color.text.title01};
  border-radius: 18px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-right-color: ${(props) => props.theme.color.componentBackground.bg02};
    border-left: 0;
    border-bottom: 0;
    margin-top: 20px;
    margin-left: 45px;
  }
`;

const B3 = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const B3Gray = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.color.text.title01};
`;
