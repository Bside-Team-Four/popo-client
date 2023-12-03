import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export default function useChangePasswordMutation() {
  const passwordChangeMutation = useMutation(
    (
      payload: { currPassword:string, toChangePassword:string },
    ) => apiService.passwordChange(payload),
  );

  return passwordChangeMutation;
}
