import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export const GET_HINTS_KEY = 'getMyProfile';

const useGetHints = ({ targetUserId, voteId }:{ targetUserId:number, voteId:number }) => useQuery(
  [GET_HINTS_KEY, voteId, targetUserId],
  async () => apiService.fetchHints({ targetUserId, voteId }),
  {
    select: (data) => data.value,
  },
);

export default useGetHints;
