import { useEffect } from 'react';

import styled from 'styled-components';

import alarm from '@/fixtures/alarm';
import Alarm from '@/types/Alarm';

import AlarmItemBox from './AlarmItemBox';

export default function AlarmPage() {
  // @TODO: sw의 전역 사용을 위해 layout 으로 이동이 필요하나 ssr 환경에서 navigator 객체가 없으므로 sw등록 불가능한 이슈 있음
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js');
  }

  useEffect(() => {
    if (process.browser) {
      const browserName = navigator.userAgent;
      console.log('Browser name:', browserName);
    }
  }, []);

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
