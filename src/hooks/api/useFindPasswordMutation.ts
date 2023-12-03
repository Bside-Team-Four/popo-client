import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export default function useFindPasswordMutation() {
  const passwordMissingMutation = useMutation(
    (payload: { email:string }) => apiService.passwordMissing(payload),
  );

  const passwordMissingAuthMutation = useMutation(
    (payload: { userId?: number, userCode: string }) => apiService.passwordMissingAuth(payload),
  );

  const passwordResetMutation = useMutation(
    (payload: { userId?: number, toChangePassword: string }) => apiService.passwordReset(payload),
  );

  return {
    passwordMissingMutation,
    passwordMissingAuthMutation,
    passwordResetMutation,
  };
}
