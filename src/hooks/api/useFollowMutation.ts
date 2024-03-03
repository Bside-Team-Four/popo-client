import { useMutation } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';

export default function useFollowMutation() {
  const followMutation = useMutation(
    (followeeId: number) => apiService.follow(followeeId),
  );

  const unfollowMutation = useMutation(
    (relationId: number) => apiService.unfollow(relationId),
  );

  return { followMutation, unfollowMutation };
}
