import { ReactNode } from 'react';

import localFont from 'next/font/local';

import Layout from '@/components/common/Layout';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';

import GlobalStyleThemeProvider from './GlobalStyleThemeProvider';

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
    { media: '(prefers-color-scheme: light)', color: '#6517FF' },
    { media: '(prefers-color-scheme: dark)', color: '#6517FF' },
  ],
  // TODO: itunes 등록 필요
  appleWebApp: {
    capable: true,
    title: 'PoPo',
    statusBarStyle: 'black-translucent',
    // TODO: startUpImage splash image
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/icons/maskable_icon_512.png',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'http://localhost:3000',
    title: 'PoPo',
    description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 PoPo ❤️',
    // TODO
    creator: '@nextjs',
    images: '/images/thumbnail.png',
  },
  openGraph: {
    title: 'PoPo',
    description: '좋아하는 마음을 익명으로 표현하고 싶은 10대를 위한, 투표 형식의 SNS 플랫폼 PoPo ❤️',
    url: 'http://localhost:3000',
    siteName: 'PoPo',
    images: '/images/thumbnail.png',
    type: 'website',
  },
};

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        {/* <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" /> */}
        {/* <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css" /> */}
        <title>PoPo</title>
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyleThemeProvider>
            <Layout>
              {children}
            </Layout>
          </GlobalStyleThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
