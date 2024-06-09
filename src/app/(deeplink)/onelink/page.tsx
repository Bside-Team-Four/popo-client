'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import UAParser from 'ua-parser-js';

export default function Onelink() {
  const router = useRouter();

  useEffect(() => {
    const uaString = typeof window === 'undefined' ? '' : window.navigator.userAgent;
    const userDeviceOs = new UAParser(uaString).getOS().name;
    if (userDeviceOs === 'Android') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.foya.popo.app';
    } else if (userDeviceOs === 'iOS') {
      window.location.href = 'https://apps.apple.com/kr/app/id6475218657';
    } else {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.foya.popo.app';
    }
  }, [router]);
  return <div />;
}
