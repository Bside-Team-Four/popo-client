import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetUserBySchoolReq } from '@/types/ApiTypes';

const GET_USERS_KEY = 'getUsers';

const useGetUsers = ({
  keyword, type, lastId, size,
}: GetUserBySchoolReq) => useQuery(
  [GET_USERS_KEY, keyword],
  async () => apiService.fetchGetUsers({
    keyword, type, lastId, size,
  }),
  {
    enabled: keyword.length >= 2,
  },
);

export default useGetUsers;
