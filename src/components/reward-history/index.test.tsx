import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import useGetInfiniteRewards from '@/hooks/api/useGetInfiniteRewards';
import { renderWithProviders } from '@/utils/testHelper';

import RewardHistory from './index';

jest.mock('@/hooks/api/useGetInfiniteRewards');

describe('RewardHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetInfiniteRewards as jest.Mock).mockImplementation(() => ({
      rewards: given.rewards,
      refState: { lastItemRef: { current: null } },
    }));
  });

  const renderRewardHistory = () => renderWithProviders(<RewardHistory />);

  context('리워드 이용내역이 없을 때', () => {
    given('rewards', () => []);

    it("'이용내역이 없어요'텍스트를 화면에 보여준다.", () => {
      renderRewardHistory();

      expect(screen.getByText('이용내역이 없어요')).toBeInTheDocument();
    });
  });

  context('리워드 이용내역이 있을 때', () => {
    given('rewards', () => fixtures.reward);

    it('리워드 이용내역 리스트를 화면에 보여준다.', () => {
      renderRewardHistory();

      expect(screen.getAllByText('적립').length).toEqual(6);
    });
  });
});
