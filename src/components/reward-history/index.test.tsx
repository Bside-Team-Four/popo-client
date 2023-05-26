import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

import RewardHistory from './index';

describe('RewardHistory', () => {
  const renderRewardHistory = () => renderWithProviders(<RewardHistory reward={given.reward} />);

  context('리워드 이용내역이 없을 때', () => {
    given('reward', () => []);

    it("'이용내역이 없어요'텍스트를 화면에 보여준다.", () => {
      renderRewardHistory();

      expect(screen.getByText('이용내역이 없어요')).toBeInTheDocument();
    });
  });

  context('리워드 이용내역이 있을 때', () => {
    given('reward', () => fixtures.reward);

    it('리워드 이용내역 리스트를 화면에 보여준다.', () => {
      renderRewardHistory();

      expect(screen.getAllByText('적립').length).toEqual(6);
    });
  });
});
