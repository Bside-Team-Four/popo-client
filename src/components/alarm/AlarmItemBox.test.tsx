import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Alarm from '@/types/Alarm';
import { renderWithProviders } from '@/utils/testHelper';

import AlarmItemBox from './AlarmItemBox';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('AlarmItemBox', () => {
  const item = fixtures.alarm;

  const renderAlarmItem = (alarm: Alarm) => {
    renderWithProviders(<AlarmItemBox item={alarm} />);
  };

  context('alarm 객체의 첫번째 항목에 title이 있을 경우', () => {
    it('title을 보여준다.', () => {
      renderAlarmItem(item[0]);

      expect(screen.getByText(item[0].questionContent)).toBeInTheDocument();
    });

    context('alarm 객체의 첫번째 항목에 user info가 있을 경우', () => {
      it('user info를 보여준다.', () => {
        renderAlarmItem(item[0]);

        expect(screen.getByText(`${item[0].schoolName} ${item[0].grade}학년 ${item[0].gender === 'MALE' ? '남자' : '여자'}`)).toBeInTheDocument();
      });
    });
  });
});
