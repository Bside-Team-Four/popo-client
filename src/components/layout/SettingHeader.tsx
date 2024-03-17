'use client';

import { usePathname } from 'next/navigation';

import Header from '../common/Header';

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

  const title = settingTitle[pathname || '/setting'];

  return (
    <Header title={title ?? ''} />
  );
}
