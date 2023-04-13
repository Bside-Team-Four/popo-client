import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence } from 'framer-motion';
import { useIsMounted } from 'usehooks-ts';

type PortalProps = {
  elementId?: string;
  show: boolean;
};

export default function Portal({ elementId = 'normal-portal-root', show, children }: PropsWithChildren<PortalProps>) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const portalRoot = document.getElementById(elementId);

  if (!portalRoot) {
    return null;
  }

  return createPortal(<AnimatePresence mode="wait">{show && children}</AnimatePresence>, portalRoot);
}
