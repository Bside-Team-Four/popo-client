import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetFollowReq } from '@/types/ApiTypes';

const GET_FOLLOWEE_KEY = 'getFollowee';

const useGetFollowee = ({ lastId, size }: GetFollowReq) => {
  const { data: followeeData, isLoading, refetch } = useQuery(
    [GET_FOLLOWEE_KEY],
    () => apiService.fetchGetFollowee({ lastId, size }),
  );
  return { followeeData, isLoading, refetch };
};

export default useGetFollowee;
