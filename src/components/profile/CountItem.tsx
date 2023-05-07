import styled from 'styled-components';

type CountItemProps = {
  title: string;
  count: number;
};

export default function CountItem({ title, count }: CountItemProps) {
  return (
    <Container>
      <Count>{count}</Count>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 46px;
`;

const Count = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${({ theme }) => theme.color.text.subTitle01};
  margin-top: 1px;
`;
