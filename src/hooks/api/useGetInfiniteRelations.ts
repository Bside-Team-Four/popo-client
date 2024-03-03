import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash/fp';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiService } from '@/lib/api/ApiService';

type GetUsersProps = {
  type:'follower' | 'followee';
};

export const GET_INFINITE_FOLLOW_KEY = 'getInfiniteFollow';

export default function useGetInfiniteFollow({ type }:GetUsersProps) {
  const query = useInfiniteQuery(
    [GET_INFINITE_FOLLOW_KEY, type],
    async ({ pageParam: lastId }) => (type === 'follower'
      ? apiService.fetchGetFollower({ lastId }) : apiService.fetchGetFollowee({ lastId })),
    {
      getNextPageParam: (res) => {
        if (res.value.length < 30) return undefined;
        const lastId = res.value[res.value.length - 1].userId;
        return lastId;
      },
      cacheTime: 0,
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

  const userData = query.data ? _.flatten(
    query.data.pages.map((res) => res.value),
  ) : [];

  const isEmpty = userData.length === 0;

  return {
    ...query,
    userData,
    isEmpty,
    refState,
  };
}
