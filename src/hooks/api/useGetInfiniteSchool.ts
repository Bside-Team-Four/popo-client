import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash/fp';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiService } from '@/lib/api/ApiService';

type GetSchoolProps = {
  keyword: string;
};

const GET_INFINITE_SCHOOLS_KEY = 'getInfiniteSchools';

export default function useGetInfiniteSchool({ keyword }:GetSchoolProps) {
  const query = useInfiniteQuery(
    [GET_INFINITE_SCHOOLS_KEY, keyword],
    async ({ pageParam = 0 }) => apiService.fetchGetSchools({ keyword, page: pageParam }),
    {
      getNextPageParam: (res) => {
        if (res.value.last) return undefined;
        return res.value.number + 1;
      },
      getPreviousPageParam: (res) => {
        if (res.value.first) return undefined;
        return res.value.number - 1;
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

  const schoolData = query.data ? _.flatten(
    query.data.pages.map((res) => res.value.content),
  ) : [];

  const isEmpty = schoolData.length === 0;

  return {
    ...query,
    schoolData,
    isEmpty,
    refState,
  };
}
