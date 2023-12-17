import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash/fp';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiService } from '@/lib/api/ApiService';

export const GET_INFINITE_ALARMS_KEY = 'getInfiniteAlarms';

export default function useGetInfiniteAlarms() {
  const query = useInfiniteQuery(
    [GET_INFINITE_ALARMS_KEY],
    async ({ pageParam: lastId }) => apiService.fetchGetAlarms(lastId),
    {
      getNextPageParam: (res) => {
        if (res.value.length < 30) return undefined;
        const lastId = res.value[res.value.length - 1].questionId;
        return lastId;
      },
    },
  );

  const refState = useIntersectionObserver<HTMLDivElement>({
    intersectionOptions: {
      rootMargin: '20px',
    },
    isRoot: true,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  });

  const alarms = query.data ? _.flatten(
    query.data.pages.map((res) => res.value),
  ) : [];

  const isEmpty = alarms.length === 0;

  return {
    ...query,
    alarms,
    isEmpty,
    refState,
  };
}
