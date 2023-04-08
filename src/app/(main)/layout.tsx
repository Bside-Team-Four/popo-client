import { ReactNode } from 'react';

import BottomNavigation from '@/components/layout/BottomNavigation';
import MainLayout from '@/components/layout/MainLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
      <BottomNavigation />
    </MainLayout>
  );
}
