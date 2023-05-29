import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

const useVoteAndSkipMutation = () => {
  const voteMutation = useMutation(
    ((payload: { chosenId: number, questionId: number }) => apiService.vote(payload)),
  );

  const skipMutation = useMutation(
    ((payload: { questionId: number }) => apiService.skip(payload)),
  );

  return {
    vote: voteMutation.mutate,
    skip: skipMutation.mutate,
  };
};

export default useVoteAndSkipMutation;
