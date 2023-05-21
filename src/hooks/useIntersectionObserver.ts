import { useEffect, useMemo, useRef } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

import { targetFalseThenValue } from '@/utils/utils';

interface UseIntersectionObserverProps {
  intersectionOptions?: IntersectionOptions;
  isRoot?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

function useIntersectionObserver<T = Element>({
  intersectionOptions, isRoot, hasNextPage, fetchNextPage,
}: UseIntersectionObserverProps) {
  const wrapperRef = useRef<T>(null);

  const checkRoot = targetFalseThenValue(isRoot);

  const { ref, inView } = useInView({
    ...intersectionOptions,
    root: checkRoot(wrapperRef.current) as unknown as Element,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  return useMemo(() => ({
    lastItemRef: ref,
    wrapperRef: checkRoot(wrapperRef),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ref, wrapperRef]);
}

export default useIntersectionObserver;
