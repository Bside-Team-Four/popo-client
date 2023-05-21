import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import SignUpUser from '@/types/SignUpUser';

export default function useSignUpMutation() {
  const signUpMutation = useMutation(
    (payload: SignUpUser) => apiService.signUp(payload),

  );

  return signUpMutation.mutate;
}
