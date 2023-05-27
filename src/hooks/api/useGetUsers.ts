import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetUserReq, GetUserResponse } from '@/types/ApiTypes';

const GET_USERS_KEY = 'getUsers';

const useGetUsers = ({
  keyword, type, lastId, size,
}: GetUserReq) => {
  const { data, isLoading, refetch } = useQuery<GetUserResponse>(
    [GET_USERS_KEY, keyword],
    async () => apiService.fetchGetUsers({
      keyword, type, lastId, size,
    }),
    {
      enabled: keyword.length >= 2,
      // refetchInterval: 500
      select: (fetchedData) => fetchedData.value,
    },
  );

  // const userData = data ? data?.value : [];
  return { userData: data, isLoading, refetch };
};

export default useGetUsers;
