import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { PostFollowUserReq } from '@/types/ApiTypes';

const POST_FOLLOW_USER_KEY = 'postFollowUser';

// @TO DO : 검색 조건 타입 추가 필요
const usePostFollowUser = ({ followeeId }: PostFollowUserReq) => {
  // eslint-disable-next-line max-len
  const { data: followData, isLoading } = useQuery(
    [POST_FOLLOW_USER_KEY],
    () => apiService.fetchPostFollowUser({
      followeeId,
    }),
    { enabled: false },
  );

  return { followData, isLoading };
};

export default usePostFollowUser;
