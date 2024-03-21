/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import ProfileIcon from '@/components/common/ProfileIcon';
import Alarm from '@/types/Alarm';
import getTimeDiff from '@/utils/getTimeDiff';

import HintBox from './HintBox';

type AlarmItemBoxProps = {
  item: Alarm;
};

function getTimeDiffStr(regDatetime:string) {
  const diff = getTimeDiff(regDatetime);
  if (diff.months > 0) {
    return `${diff.months}개월 전`;
  }
  if (diff.days > 0) {
    return `${diff.days}일 전`;
  }
  if (diff.hours > 0) {
    return `${diff.hours}시간 전`;
  }
  if (diff.minutes > 0) {
    return `${diff.hours}분 전`;
  }
  return '방금 전';
}

export default function AlarmItemBox({ item }: AlarmItemBoxProps) {
  const diffStr = getTimeDiffStr(item.regDatetime);

  return (
    <Container data-testid="alarm_item_box">
      <TopContainer>
        <ProfileIcon
          gender={item.gender}
          variant="circle"
        />
        <QuestionBox>{item.questionContent}</QuestionBox>
      </TopContainer>
      <MiddleContainer>
        <TextContainer>
          <InfoContainer>
            <B3Gray>{`${item.schoolName} ${item.grade}학년 ${item.gender === 'MALE' ? '남자' : '여자'}`}</B3Gray>
          </InfoContainer>
        </TextContainer>
        <TimeContainer>
          <B3Gray>{diffStr}</B3Gray>
        </TimeContainer>
      </MiddleContainer>
      <HintBox test-id="hint-box" voteId={item.voteId} userId={item.userId} />
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
  position: relative;
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
    left: -3px;
    bottom: 0;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-right-color: ${(props) => props.theme.color.componentBackground.bg02};
    border-left: 0;
    border-bottom: 0;
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
