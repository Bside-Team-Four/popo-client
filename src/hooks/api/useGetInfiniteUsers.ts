import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash/fp';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiService } from '@/lib/api/ApiService';

type GetUsersProps = {
  type:'NAME' | 'SCHOOL';
  keyword: string;
};

export const GET_INFINITE_USERS_KEY = 'getInfiniteUsers';

export default function useGetInfiniteUsers({ type, keyword }:GetUsersProps) {
  const query = useInfiniteQuery(
    [GET_INFINITE_USERS_KEY],
    async ({ pageParam: lastId }) => apiService.fetchGetUsers({ type, keyword, lastId }),
    {
      getNextPageParam: (res) => {
        if (res.value.length < 30) return undefined;
        const lastId = res.value[res.value.length - 1].userId;
        return lastId;
      },
      enabled: keyword.length >= 2,
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
