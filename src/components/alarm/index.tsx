import Image from 'next/image';

import styled from 'styled-components';

import useGetInfiniteAlarms from '@/hooks/api/useGetInfiniteAlarms';
import Alarm from '@/types/Alarm';

import AlarmItemBox from './AlarmItemBox';

export default function AlarmPage() {
  const { alarms } = useGetInfiniteAlarms();
  return (
    <Container>
      <TitleContainer>
        <Title>나를 뽑은 사람</Title>
      </TitleContainer>
      {alarms.map((item: Alarm) => (
        <AlarmItemBox key={item.questionId} item={item} />
      ))}

      {alarms.length === 0 && (
        <NoDataContainer>
          <Image
            src="/images/alarm_nodata-icon.svg"
            width={96}
            height={96}
            alt="알림 없음 이미지"
            priority
          />
          <NoDataText>나를 뽑은 사람이 아직 없어요.</NoDataText>
        </NoDataContainer>
      )}

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 44px 24px 0 24px;
  background-color: ${({ theme }) => theme.color.background};
`;

const TitleContainer = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 36px;
  line-height: 46px;
  color: ${({ theme }) => theme.color.text.title01};
  font-weight: 200;
`;

const NoDataContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const NoDataText = styled.p`
  color: ${({ theme }) => theme.color.text.title01};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 153.333% */
  letter-spacing: -0.375px;
`;
