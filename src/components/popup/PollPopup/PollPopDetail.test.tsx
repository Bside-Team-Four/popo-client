import { fireEvent, screen } from '@testing-library/react';

import PollPopDetail from '@/components/popup/PollPopup/PollPopDetail';
import fixtures from '@/fixtures';
import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

jest.useFakeTimers();

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('PollPopup', () => {
  const onClose = jest.fn();

  const renderPollPopup = () => renderWithPortal(
    <MockTheme>
      <PollPopDetail
        polls={fixtures.polls}
        totalQuestionCount={3}
        userCurrentIndex={1}
        onClose={onClose}
      />
    </MockTheme>,
    'full-portal-root',
  );

  context('goNextStep 버튼이 눌리면', () => {
    it('다음 step 으로 넘어간다.', () => {
      renderPollPopup();

      expect(screen.getByText('1 / 3')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      expect(screen.getByText('2 / 3')).toBeInTheDocument();
    });

    it('마지막 step일 경우 onClose가 호출된다.', () => {
      renderPollPopup();

      expect(screen.getByText('1 / 3')).toBeInTheDocument();

      Array.from({ length: 2 }).forEach(() => {
        fireEvent.click(screen.getByTestId('건너뛰기 button'));
      });

      expect(screen.getByText('3 / 3')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      setTimeout(() => {
        expect(onClose).toHaveBeenCalled();
      }, 1000);
    });
  });
});
