'use client';

import RewardHistory from '@/components/reward-history';
import fixtures from '@/fixtures';

export default function RewardHistoryPage() {
  const { reward } = fixtures;

  return (
    <RewardHistory reward={reward} />
  );
}
