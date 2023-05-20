import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { GetUserBySchoolReq } from '@/types/ApiTypes';

const GET_USERS_KEY = 'getUsers';

// @TO DO : 검색 조건 타입 추가 필요
const useGetUsers = ({
  keyword, type, lastId, size,
}: GetUserBySchoolReq) => {
  const { data: userData, isLoading } = useQuery(
    [GET_USERS_KEY, keyword],
    () => apiService.fetchGetUsersBySchool({
      keyword, type, lastId, size,
    }),
    {
      enabled: keyword.length >= 2,
    },
  );

  return { userData, isLoading };
};

export default useGetUsers;
