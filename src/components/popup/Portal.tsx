import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useIsMounted } from 'usehooks-ts';

type PortalProps = {
  elementId?: string;
};

export default function Portal({ elementId = 'popup-portal', children }: PropsWithChildren<PortalProps>) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const portalRoot = document.getElementById(elementId);

  if (!portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
}
