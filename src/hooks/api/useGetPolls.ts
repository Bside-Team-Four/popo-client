import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const GET_POLLS_KEY = 'getPolls';

const useGetPolls = () => useQuery(
  [GET_POLLS_KEY],
  async () => apiService.fetchPollList(),
  {
    select: (data) => data.value,
    cacheTime: 0,
    staleTime: 0,
  },
);

export default useGetPolls;
