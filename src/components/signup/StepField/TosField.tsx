import Link from 'next/link';

import { styled } from 'styled-components';

import CheckBox from '@/components/common/Checkbox';

type Props = {
  value: boolean;
  onChange: (value:boolean)=>void;
};

export default function TosField({ value, onChange }:Props) {
  return (
    <div>
      <CheckBox checked={value} onChange={onChange} text="필수 이용약관">
        <Container>
          <Link href="/tos/use">
            <UnderlineText>서비스 이용약관</UnderlineText>
          </Link>
          <Link href="/tos/privacy">
            <UnderlineText>개인정보 처리방침</UnderlineText>
          </Link>
        </Container>
      </CheckBox>
    </div>
  );
}

const Container = styled.div`
  width: max-content;
  padding: 10px;
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

const UnderlineText = styled.label`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.color.text.subTitle01};
  text-decoration: underline;
`;
