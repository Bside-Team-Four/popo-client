import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const GET_MY_PROFILE_KEY = 'getMyProfile';

const useGetMyProfile = () => useQuery(
  [GET_MY_PROFILE_KEY],
  async () => apiService.fetchMyProfile(),
  {
    select: (data) => data.value,
  },
);

export default useGetMyProfile;
