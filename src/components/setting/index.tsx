import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import styled from 'styled-components';

import SettingItem from '@/components/common/SettingItem';

export default function Setting() {
  const router = useRouter();

  return (
    <Container>
      <SettingItem
        title="프로필 관리"
        onClick={() => router.push('/setting/profile-setting')}
        showArrow
      />
      <GrayBar />
      <SettingItem
        title="알림 설정"
        onClick={() => router.push('/setting/notification')}
        showArrow
      />
      <GrayBar />
      <SettingItem
        title="문의"
        message="sasimpopo@gmail.com"
      />
      <SettingItem
        title="이용약관"
        onClick={() => router.push('/setting/tos')}
        showArrow
      />
      <GrayBar />
      <SettingItem
        title="비밀번호 변경"
        onClick={() => router.push('/setting/change-password')}
        showArrow
      />
      <SettingItem
        title="회원탈퇴"
        onClick={() => router.push('/setting/remove-account')}
        showArrow
      />
      <SettingItem
        title="로그아웃"
        onClick={() => signOut()}
      />
      <GrayBar />
      <SettingItem
        title="앱 버전 정보"
        message="v 1.0.0"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const GrayBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  margin-bottom: 40px;
`;
