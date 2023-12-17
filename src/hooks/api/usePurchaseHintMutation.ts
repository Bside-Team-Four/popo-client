import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

import { GET_HINTS_KEY } from './useGetHints';

export default function usePurchaseHintMutation() {
  const queryClient = useQueryClient();
  const purchaseHintMutation = useMutation(
    ({
      voteId,
      hintId,
    }:{ voteId: number, hintId: number }) => apiService.purchaseHint({ voteId, hintId }),
    {
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries([GET_HINTS_KEY, variable.voteId]);
      },
    },
  );

  return purchaseHintMutation.mutate;
}
