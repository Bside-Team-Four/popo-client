import Image from 'next/image';

import styled from 'styled-components';

export default function NotHistory() {
  return (
    <Container>
      <NotHistoryImage />
      <Message>이용내역이 없어요</Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const NotHistoryImage = styled(Image).attrs({
  src: '/images/not-history.svg',
  width: 96,
  height: 96,
  alt: 'not history image',
  priority: true,
})``;

const Message = styled.div`
  margin-top: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: ${({ theme }) => theme.color.text.title01};
`;
