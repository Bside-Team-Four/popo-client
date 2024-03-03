import { InfiniteData, useQueryClient } from '@tanstack/react-query';

import { FollowResponse, GetUsersResponse, UnfollowResponse } from '@/types/ApiTypes';
import User from '@/types/User';
import trasformInfiniteQueryData from '@/utils/trasformInfiniteQueryData';

import useFollowMutation from './useFollowMutation';

export default function useToggleRelation(invalidateKey:string) {
  const queryClient = useQueryClient();
  const { followMutation, unfollowMutation } = useFollowMutation();

  function onFollowSuccess(res: FollowResponse, followeeId: number) {
    queryClient.setQueriesData(
      {
        exact: false,
        queryKey: [invalidateKey],
        predicate: (query) => Boolean(query),
      },
      (oldData) => {
        if (oldData === undefined) {
          return undefined;
        }
        return trasformInfiniteQueryData(
          oldData as InfiniteData<GetUsersResponse>,
          (user:User) => (user.userId === followeeId
            ? { ...user, isFollow: true, relationId: res.value.relationId }
            : user),
        );
      },
    );
  }

  function onUnfollowMutate(_: UnfollowResponse, relationId: number) {
    queryClient.setQueriesData(
      {
        exact: false,
        queryKey: [invalidateKey],
        predicate: (query) => Boolean(query),
      },
      (oldData) => {
        if (oldData === undefined) {
          return undefined;
        }
        return trasformInfiniteQueryData(
          oldData as InfiniteData<GetUsersResponse>,
          (user:User) => (user.relationId === relationId
            ? { ...user, isFollow: false, relationId: null }
            : user),
        );
      },
    );
  }

  function toggleRelation(userId: number, relationId: number | null) {
    if (relationId) {
      unfollowMutation.mutate(relationId, {
        onSuccess: (res) => { onUnfollowMutate(res, relationId); },
      });
    } else {
      followMutation.mutate(userId, { onSuccess: (res) => { onFollowSuccess(res, userId); } });
    }
  }

  return {
    toggleRelation,
  };
}
