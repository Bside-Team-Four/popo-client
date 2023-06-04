import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { PostCancelFollowUserReq } from '@/types/ApiTypes';

const POST_FOLLOW_CANCEL_USER_KEY = 'postFollowCancelUser';

// @TO DO : 검색 조건 타입 추가 필요
const usePostCancelFollowUser = ({ relationId }: PostCancelFollowUserReq) => {
  // eslint-disable-next-line max-len
  const { data: cancelFollowData, isLoading, refetch } = useQuery(
    [POST_FOLLOW_CANCEL_USER_KEY],
    () => apiService.fetchPostCancelFollowUser({ relationId }),
    {
      enabled: false,
      onError: () => {
        alert('에러가 발생했습니다');
      },
    },
  );

  return { cancelFollowData, isLoading, refetch };
};

export default usePostCancelFollowUser;
