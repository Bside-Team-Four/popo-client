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
      getNextPageParam: (lastPage) => {
        if (lastPage.data.last) return undefined;
        return lastPage.data.number + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.first) return undefined;
        return firstPage.data.number - 1;
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
    query.data.pages.map((page) => page.data.content),
  ) : [];

  const isEmpty = schoolData.length === 0;

  return {
    ...query,
    schoolData,
    isEmpty,
    refState,
  };
}
