'use client';

import { ReactNode } from 'react';

import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import CustomToast from '@/components/layout/CustomToast';
import MobileLayout from '@/components/layout/MobileLayout';
import ReactQueryProvider from '@/components/provider/ReactQueryProvider';
import StyledComponentsRegistry from '@/components/provider/StyledComponentsRegistry';

import 'react-toastify/dist/ReactToastify.css';

const SizeThemeProvider = dynamic(() => import('../components/provider/SizeThemeProvider'), {
  ssr: false,
});

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <RecoilRoot>
          <AnimatePresence>
            <StyledComponentsRegistry>
              <SizeThemeProvider>
                <MobileLayout>
                  {children}
                  <CustomToast />
                </MobileLayout>
              </SizeThemeProvider>
            </StyledComponentsRegistry>
          </AnimatePresence>
        </RecoilRoot>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
