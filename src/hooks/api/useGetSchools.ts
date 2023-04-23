import { useQuery } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

type GetSchoolProps = {
  keyword: string;
};

const GET_SCHOOLS_KEY = 'getSchools';

const useGetSchools = ({ keyword }:GetSchoolProps) => {
  const { data: schoolData, isLoading } = useQuery(
    [GET_SCHOOLS_KEY, keyword],
    () => apiService.fetchGetSchools({ keyword }),
    {
      enabled: keyword.length >= 2,
    },
  );

  return { schoolData, isLoading };
};

export default useGetSchools;
