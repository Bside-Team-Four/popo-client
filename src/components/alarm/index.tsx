'use client';

import styled from 'styled-components';

import AlarmItemBox from '@/components/alarm/AlarmItemBox';
import alarms from '@/fixtures/alarms';
import { h1Font } from '@/styles/fontStyles';
import Alarm from '@/types/Alarm';

export default function AlarmPage() {
  return (
    <Container>
      <TitleContainer>
        <H1>나를 뽑은 사람</H1>
      </TitleContainer>
      {alarms.map((item: Alarm) => (
        <AlarmItemBox key={item.title + item.createdAt} item={item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 44px 24px 0 24px;
`;

const TitleContainer = styled.div`
  margin-bottom: 10px;
`;

const H1 = styled.div`
  ${h1Font};
  color: ${({ theme }) => theme.color.black};
  font-weight: 200;
`;
