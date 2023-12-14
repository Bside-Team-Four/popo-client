import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash/fp';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiService } from '@/lib/api/ApiService';

export const GET_INFINITE_REWARD_KEY = 'getInfiniteRewards';

export default function useGetInfiniteRewards() {
  const query = useInfiniteQuery(
    [GET_INFINITE_REWARD_KEY],
    async ({ pageParam: lastId }) => apiService.fetchGetRewards(lastId),
    {
      getNextPageParam: (res) => {
        if (res.value.length < 30) return undefined;
        const lastId = res.value[res.value.length - 1].historyId;
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

  const rewards = query.data ? _.flatten(
    query.data.pages.map((res) => res.value),
  ) : [];

  const isEmpty = rewards.length === 0;

  return {
    ...query,
    rewards,
    isEmpty,
    refState,
  };
}
