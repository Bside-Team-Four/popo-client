'use client';

import styled from 'styled-components';

import ProfileIcon from '@/components/common/ProfileIcon';
import { b2Font, b3Font } from '@/styles/fontStyles';
import AlarmItem from '@/types/AlarmItem';

export default function AlarmItemBox({ item }: { item: AlarmItem }) {
  return (
    <Container>
      <Flexbox>
        <ProfileIcon
          gender={item.userInfo.gender === '남성' ? 'MAN' : 'WOMAN'}
        />
        <TextContainer>
          <B2>{item.title}</B2>
          <InfoContainer>
            <B3>{`${item.userInfo.gender} | ${item.userInfo.schoolInfo}`}</B3>
          </InfoContainer>
        </TextContainer>
      </Flexbox>
      <TimeContainer>
        <B3>{item.createdAt}</B3>
      </TimeContainer>
    </Container>
    // <Container>PoPo</Container>
  );
}
const Flexbox = styled.div`
  display: flex;
`;
const Container = styled(Flexbox)`
  padding: 10px 24px;
  justify-content: space-between;
  min-height: 70px;
  align-items: center;
  margin-bottom: 12px;
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

const B2 = styled.div`
  ${b2Font};
  color: ${({ theme }) => theme.color.black};
`;

const B3 = styled.div`
  ${b3Font};
  /* color: ${({ theme }) => theme.color.light_gray}; */
  color: rgba(0, 0, 0, 0.4);
`;
