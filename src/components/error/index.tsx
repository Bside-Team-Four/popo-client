import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';

type ErrorProps = {
  onClick: () =>void;
};

export default function Error({ onClick }: ErrorProps) {
  return (
    <Container>
      <ErrorTitle>Error!!!</ErrorTitle>
      <ErrorMessage>에러가 발생했습니다.</ErrorMessage>
      <SmallButton onClick={onClick}>다시 불러오기</SmallButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.background};
  width: 100%;
  height: 100%;
`;

const ErrorTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 35px;
  color: ${({ theme }) => theme.color.primary};
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  margin-bottom: 35px;
  color: ${({ theme }) => theme.color.text.title01};
`;
