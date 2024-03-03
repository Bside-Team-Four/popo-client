'use client';

import { usePathname, useRouter } from 'next/navigation';

import styled from 'styled-components';

import BackIcon from '@/lib/assets/back-icon.svg';

const settingTitle:{ [key: string]: string } = {
  '/setting': '설정',
  '/setting/profile-setting': '프로필 관리',
  '/setting/notification': '알림 설정',
  '/setting/tos': '이용약관',
  '/setting/change-password': '비밀번호 변경',
  '/setting/remove-account': '회원 탈퇴',
  '/setting/tos/use': 'POPO 서비스 이용약관',
  '/setting/tos/privacy': '개인정보 처리방침',
  '/reward-history': '이용내역',
  '/follow': '',
};

export default function SettingHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const title = settingTitle[pathname || '/setting'];

  const onBack = () => router.back();

  return (
    <Container>
      <BackButton data-testid="back-button" onClick={onBack} />
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(BackIcon)`
  position: absolute;
  left: 16px;
  top: 21px;
  path{
    fill: ${({ theme }) => theme.color.text.title02};
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.text.title01};
`;
