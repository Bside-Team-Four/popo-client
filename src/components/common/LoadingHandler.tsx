import { PropsWithChildren, ReactElement } from 'react';

import { AnimatePresence } from 'framer-motion';

type LoadingHandlerProps = {
  isLoading: boolean;
  loadingComponent: ReactElement;
};

export default function LoadingHandler(
  { isLoading, loadingComponent, children }:PropsWithChildren<LoadingHandlerProps>,
) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? <>{loadingComponent}</> : children}
    </AnimatePresence>
  );
}
