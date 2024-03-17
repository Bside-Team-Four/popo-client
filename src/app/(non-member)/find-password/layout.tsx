import { ReactNode } from 'react';

import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      { children }
    </>
  );
}
