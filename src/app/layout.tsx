import { ReactNode } from 'react';

import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

import MobileLayout from '@/components/common/MobileLayout';

import StyledComponentsRegistry from './StyledComponentsRegistry';

const SizeThemeProvider = dynamic(() => import('./SizeThemeProvider'), {
  ssr: false,
});

export const metadata = {
  applicationName: 'PoPo',
  title: 'PoPo',
  authors: [
    { name: 'JaeJun', url: 'https://github.com/JaeMeDev' },
    { name: 'YangHa', url: 'https://github.com/ummaeha' },
  ],
  description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 PoPo ❤️',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  // TODO: itunes 등록 필요
  appleWebApp: {
    capable: true,
    title: 'PoPo',
    statusBarStyle: 'default',
    // TODO: startUpImage splash image
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icons/maskable_icon_512.png',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://popo-client.vercel.app',
    title: 'PoPo',
    description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 PoPo ❤️',
    // TODO
    creator: '@nextjs',
    images: '/images/thumbnail.png',
  },
  openGraph: {
    title: 'PoPo',
    description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 PoPo ❤️',
    url: 'https://popo-client.vercel.app',
    siteName: 'PoPo',
    images: '/images/thumbnail.png',
    type: 'website',
  },
};

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
});

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        <title>PoPo</title>
      </head>
      <body>
        <StyledComponentsRegistry>
          <SizeThemeProvider>
            <MobileLayout>
              {children}
            </MobileLayout>
          </SizeThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
