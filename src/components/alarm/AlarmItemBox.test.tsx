import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Alarm from '@/types/Alarm';
import { renderWithProviders } from '@/utils/testHelper';

import AlarmItemBox from './AlarmItemBox';

describe('AlarmItemBox', () => {
  const item = fixtures.alarm;

  const renderAlarmItem = (alarm: Alarm) => {
    renderWithProviders(<AlarmItemBox item={alarm} />);
  };

  context('alarm 객체의 첫번째 항목에 title이 있을 경우', () => {
    // @TO DO: Array 전체를 돌며 테스트할 수 있는 코드 필요.
    it('title을 보여준다.', () => {
      renderAlarmItem(item[0]);
      const title = screen.getByText(item[0].title);
      expect(title).toBeInTheDocument();
    });

    context('alarm 객체의 첫번째 항목에 user info가 있을 경우', () => {
      it('user info를 보여준다.', () => {
        renderAlarmItem(item[0]);
        const userInfo = screen.getByText(`${item[0].userInfo.gender} | ${item[0].userInfo.schoolInfo}`);
        expect(userInfo).toBeInTheDocument();
      });
    });
  });
});
