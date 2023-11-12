import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { apiService } from '@/lib/api/ApiService';
import { FollowResponse, GetUsersResponse, UnfollowResponse } from '@/types/ApiTypes';
import User from '@/types/User';

import { GET_INFINITE_USERS_KEY } from './useGetInfiniteUsers';

function infiniteDataTrasformer(
  data:InfiniteData<GetUsersResponse>,
  userMapper: (user: User) => User,
) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      value: page.value.map(userMapper),
    })),
  };
}

export default function useFollowMutation() {
  const queryClient = useQueryClient();

  function onFollowSuccess(res: FollowResponse, followeeId: number) {
    queryClient.setQueryData<InfiniteData<GetUsersResponse>>(
      [GET_INFINITE_USERS_KEY],
      (oldData) => {
        if (oldData === undefined) {
          return undefined;
        }
        return infiniteDataTrasformer(
          oldData,
          (user) => (user.userId === followeeId
            ? { ...user, isFollow: true, relationId: res.value.relationId }
            : user),
        );
      },
    );
  }

  function onUnfollowMutate(_: UnfollowResponse, relationId: number) {
    queryClient.setQueryData<InfiniteData<GetUsersResponse>>(
      [GET_INFINITE_USERS_KEY],
      (oldData) => {
        if (oldData === undefined) {
          return undefined;
        }
        return infiniteDataTrasformer(
          oldData,
          (user) => (user.relationId === relationId
            ? { ...user, isFollow: false, relationId: null }
            : user),
        );
      },
    );
  }

  const followMutation = useMutation(
    (followeeId: number) => apiService.follow(followeeId),
    {
      onSuccess: onFollowSuccess,
    },
  );

  const unfollowMutation = useMutation(
    (relationId: number) => apiService.unfollow(relationId),
    {
      onSuccess: onUnfollowMutate,
    },
  );

  return { followMutation, unfollowMutation };
}
