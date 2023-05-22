'use client';

import FixedSpinner from '@/components/common/FixedSpinner';
import LoadingHandler from '@/components/common/LoadingHandler';
import Home from '@/components/home';
import useGetPollStatus from '@/hooks/api/useGetPollStatus';

export default function POPO() {
  const { isLoading } = useGetPollStatus();

  return (
    <LoadingHandler isLoading={isLoading} loadingComponent={<FixedSpinner type="normal" />}>
      <Home />
    </LoadingHandler>
  );
}
