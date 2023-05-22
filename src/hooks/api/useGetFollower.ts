import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const GET_FOLLOWER_KEY = 'getFollower';

const useGetFollower = () => {
  const { data: followerData, isLoading } = useQuery(
    [GET_FOLLOWER_KEY],
    () => apiService.fetchGetFollower(),
  );
  return { followerData, isLoading };
};

export default useGetFollower;
