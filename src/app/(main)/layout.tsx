import { ReactNode } from 'react';

import BottomNavigation from '@/components/common/BottomNavigation';
import MainLayout from '@/components/common/MainLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
      <BottomNavigation />
    </MainLayout>
  );
}
