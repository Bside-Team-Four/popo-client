import { useQuery } from '@tanstack/react-query';

import usePollStatus from '@/hooks/recoil/usePollStatus';
import { apiService } from '@/lib/api/ApiService';

const GET_POLL_STATUS_KEY = 'getPollStatus';

const useGetPollStatus = () => {
  const { setPollStatus } = usePollStatus();

  return useQuery(
    [GET_POLL_STATUS_KEY],
    async () => apiService.fetchGetPollStatus(),
    {
      onSuccess: (res) => {
        setPollStatus(res.value.status);
      },
      refetchOnWindowFocus: 'always',
    },
  );
};

export default useGetPollStatus;
