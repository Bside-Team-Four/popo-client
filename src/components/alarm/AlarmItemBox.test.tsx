import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Alarm from '@/types/Alarm';
import Hint from '@/types/Hint';
import { renderWithThemeProviders } from '@/utils/testHelper';

import AlarmItemBox from './AlarmItemBox';
import HintBox from './HintBox';

describe('AlarmItemBox', () => {
  const item = fixtures.alarm;

  const renderAlarmItem = (alarm: Alarm) => {
    renderWithThemeProviders(<AlarmItemBox item={alarm} />);
  };

  const renderHintBox = (hint: Hint[]) => {
    renderWithThemeProviders(<HintBox hintData={hint} />);
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

    context('hints가 존재하면', () => {
      it('hint box를 보여준다', () => {
        const { hints } = item[0];
        renderAlarmItem(item[0]);
        renderHintBox(hints || []);
        // @TO DO: test-id를 활용해서 getByTestId로 수정해보기
        const hintButtons = screen.queryAllByRole('button', {
          name: '힌트 보기',
        });
        const hintButton = hintButtons.find((button) => button.getAttribute('data-testid') === 'hint-button');

        expect(hintButton).toBeInTheDocument();
        expect(hintButton).toHaveTextContent('힌트 보기');
      });
    });
  });
});
