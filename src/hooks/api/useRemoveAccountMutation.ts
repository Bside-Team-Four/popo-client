import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const useRemoveAccountMutation = () => {
  const removeAccountMutation = useMutation(
    () => apiService.removeAccount(),
  );

  return removeAccountMutation.mutate.bind(null, undefined);
};

export default useRemoveAccountMutation;
