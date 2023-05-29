import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import RewardItem from './RewardItem';

describe('RewardItem', () => {
  const renderRewardItem = () => renderWithProviders(
    <RewardItem type={given.type} date="23일 23:59" point={100} />,
  );

  context('리워드가 적립(ADD) 상태일 경우', () => {
    given('type', () => 'ADD');

    it("'적립' 텍스트가 화면에 보인다.", () => {
      renderRewardItem();

      expect(screen.getByText('적립')).toBeInTheDocument();
    });

    it('포인트가 +100 PPP로 보인다.(보라색으로)', () => {
      renderRewardItem();

      const pointText = screen.getByText('+100 PPP');

      expect(pointText).toBeInTheDocument();
      expect(pointText).toHaveStyleRule('color', '#AF52DE');
    });
  });

  context('리워드가 사용(USE) 상태일 경우', () => {
    given('type', () => 'USE');

    it("'사용' 텍스트가 화면에 보인다.", () => {
      renderRewardItem();

      expect(screen.getByText('사용')).toBeInTheDocument();
    });

    it('포인트가 -100 PPP로 보인다.(검정색으로)', () => {
      renderRewardItem();

      const pointText = screen.getByText('-100 PPP');

      expect(pointText).toBeInTheDocument();
      expect(pointText).toHaveStyleRule('color', '#000000');
    });
  });
});
