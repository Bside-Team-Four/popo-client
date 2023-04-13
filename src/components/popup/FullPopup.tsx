import { PropsWithChildren } from 'react';

import Portal from './Portal';
import SprintMotion from './SprintMotion';

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
