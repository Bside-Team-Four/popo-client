import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const GET_FOLLOWEE_KEY = 'getFollowee';

const useGetFollowee = () => {
  const { data: followeeData, isLoading } = useQuery(
    [GET_FOLLOWEE_KEY],
    () => apiService.fetchGetFollowee(),
  );
  return { followeeData, isLoading };
};

export default useGetFollowee;
