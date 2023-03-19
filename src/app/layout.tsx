import { ReactNode } from 'react';

import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';

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

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyleThemeProvider>
            {children}
          </GlobalStyleThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
