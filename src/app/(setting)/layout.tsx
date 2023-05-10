import { PropsWithChildren } from 'react';

import SettingHeader from '@/components/layout/SettingHeader';

export default function SettingLayout({ children }:PropsWithChildren) {
  return (
    <>
      <SettingHeader />
      {children}
    </>
  );
}
