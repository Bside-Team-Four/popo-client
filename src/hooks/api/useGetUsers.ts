import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetUserReq } from '@/types/ApiTypes';

const GET_USERS_KEY = 'getUsers';

const useGetUsers = ({
  keyword, type, lastId, size,
}: GetUserReq) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_USERS_KEY, keyword],
    async () => apiService.fetchGetUsers({
      keyword, type, lastId, size,
    }),
    {
      enabled: keyword.length >= 2,
      // refetchInterval: 500
    },
  );

  const userData = data ? data.value : [];
  return { userData, isLoading, refetch };
};

export default useGetUsers;
