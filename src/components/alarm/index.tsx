import styled from 'styled-components';

import alarm from '@/fixtures/alarm';
import Alarm from '@/types/Alarm';

import AlarmItemBox from './AlarmItemBox';

export default function AlarmPage() {
  return (
    <Container>
      <TitleContainer>
        <Title>나를 뽑은 사람</Title>
      </TitleContainer>
      {alarm.map((item: Alarm) => (
        <AlarmItemBox key={item.title + item.createdAt} item={item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
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
