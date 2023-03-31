'use client';

import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { AnimatePresence } from 'framer-motion';

import MobileLayout from '@/components/common/MobileLayout';
import StyledComponentsRegistry from '@/components/provider/StyledComponentsRegistry';

const SizeThemeProvider = dynamic(() => import('../components/provider/SizeThemeProvider'), {
  ssr: false,
});

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <StyledComponentsRegistry>
        <SizeThemeProvider>
          <MobileLayout>
            {children}
          </MobileLayout>
        </SizeThemeProvider>
      </StyledComponentsRegistry>
    </AnimatePresence>
  );
}
