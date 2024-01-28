import Link from 'next/link';

import styled from 'styled-components';

import Button from '@/components/common/Button';

type LoginButtonsProps = {
  isActive: boolean;
};

export default function LoginButtons({ isActive }: LoginButtonsProps) {
  return (
    <Container>
      <SubmitButton disabled={!isActive}>로그인</SubmitButton>
      <SignUpLink href="/signup">이메일로 회원가입</SignUpLink>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 24px;
  bottom: 39px;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  margin-bottom: 10px;
`;

const SignUpLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  text-decoration: underline;
  color: ${({ theme }) => theme.color.text.title01};
`;
