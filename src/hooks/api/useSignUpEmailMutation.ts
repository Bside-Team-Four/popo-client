import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export default function useSignUpEmailMutation() {
  const signUpSendEmailMutation = useMutation(
    (payload: { email: string }) => apiService.signUpSendEmail(payload),
  );

  const signUpAuthEmailMutation = useMutation(
    (payload: { email: string, userCode: string }) => apiService.signUpAuthEmail(payload),
  );

  return { signUpSendEmailMutation, signUpAuthEmailMutation };
}
