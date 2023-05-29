import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetFollowReq } from '@/types/ApiTypes';

const GET_FOLLOWER_KEY = 'getFollower';

const useGetFollower = ({ lastId, size }: GetFollowReq) => {
  const { data: followerData, isLoading, refetch } = useQuery(
    [GET_FOLLOWER_KEY],
    () => apiService.fetchGetFollower({ lastId, size }),
  );
  return { followerData, isLoading, refetch };
};

export default useGetFollower;
