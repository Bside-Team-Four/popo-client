import styled from 'styled-components';

type TosTextProps = {
  text: string;
};

export default function TosText({ text }:TosTextProps) {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 20px 24px 0;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  white-space: pre-wrap;
`;
