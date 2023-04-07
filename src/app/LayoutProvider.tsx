'use client';

import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';

import MobileLayout from '@/components/common/MobileLayout';
import ReactQueryProvider from '@/components/provider/ReactQueryProvider';
import StyledComponentsRegistry from '@/components/provider/StyledComponentsRegistry';

const SizeThemeProvider = dynamic(() => import('../components/provider/SizeThemeProvider'), {
  ssr: false,
});

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <RecoilRoot>
        <AnimatePresence>
          <StyledComponentsRegistry>
            <SizeThemeProvider>
              <MobileLayout>
                {children}
              </MobileLayout>
            </SizeThemeProvider>
          </StyledComponentsRegistry>
        </AnimatePresence>
      </RecoilRoot>
    </ReactQueryProvider>
  );
}
