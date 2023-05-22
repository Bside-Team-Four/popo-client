import { ReactNode } from 'react';

import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import LayoutProvider from './LayoutProvider';

dayjs.locale('ko');
dayjs.extend(utc);

export const metadata: Metadata = {
  metadataBase: new URL('https://popo-client.vercel.app'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  applicationName: 'POPO',
  title: 'POPO',
  authors: [
    { name: 'JaeJun', url: 'https://github.com/JaeMeDev' },
    { name: 'YangHa', url: 'https://github.com/ummaeha' },
  ],
  description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 POPO ❤️',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  // TODO: itunes 등록 필요
  appleWebApp: {
    capable: true,
    title: 'POPO',
    statusBarStyle: 'default',
    // TODO: startUpImage splash image
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icons/maskable_icon_512.png',
  },
  openGraph: {
    title: 'POPO',
    description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 POPO ❤️',
    url: 'https://popo-client.vercel.app',
    siteName: 'POPO',
    images: '/images/thumbnail.png',
    type: 'website',
  },
};

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

const poppins = Poppins({
  weight: ['200', '400', '600'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${poppins.variable}`}>
      <head>
        <title>POPO</title>
      </head>
      <body>
        <LayoutProvider>
          {children}
          <div id="full-portal-root" />
          <div id="normal-portal-root" />
        </LayoutProvider>
      </body>
    </html>
  );
}
