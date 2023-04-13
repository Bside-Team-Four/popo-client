import { PropsWithChildren } from 'react';

import SprintMotion from '@/components/popup/SprintMotion';

import Portal from './Portal';

type FullPopupProps = {
  show: boolean;

};

export default function FullPopup({ children, show }: PropsWithChildren<FullPopupProps>) {
  return (
    <Portal show={show} elementId="full-portal-root">
      <SprintMotion>
        {children}
      </SprintMotion>
    </Portal>
  );
}
