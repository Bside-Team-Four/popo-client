import { useMutation, useQueryClient } from '@tanstack/react-query';

import useOutOfReword from '@/hooks/recoil/useOutOfReword';
import { apiService } from '@/lib/api/ApiService';
import ApiException from '@/lib/excptions/ApiException';

import { GET_HINTS_KEY } from './useGetHints';

export default function usePurchaseHintMutation() {
  const { setOutOfReword } = useOutOfReword();
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
      onError: (error:ApiException) => {
        if (error.code === 402) {
          setOutOfReword(true);
        }
      },
    },
  );

  return purchaseHintMutation.mutate;
}
