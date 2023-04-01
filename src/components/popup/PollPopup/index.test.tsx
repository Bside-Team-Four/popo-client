import { fireEvent, screen } from '@testing-library/react';

import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

import PollPopup from './index';

jest.useFakeTimers();

describe('PollPopup', () => {
  const onClose = jest.fn();

  const renderPollPopup = () => renderWithPortal(
    <MockTheme>
      <PollPopup onClose={onClose} />
    </MockTheme>,
  );

  context('goNextStep 버튼이 눌리면', () => {
    it('다음 step 으로 넘어간다.', () => {
      renderPollPopup();

      expect(screen.getByText('1 / 7')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      expect(screen.getByText('2 / 7')).toBeInTheDocument();
    });

    it('마지막 step일 경우 onClose가 호출된다.', () => {
      renderPollPopup();

      expect(screen.getByText('1 / 7')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));
      fireEvent.click(screen.getByTestId('건너뛰기 button'));
      fireEvent.click(screen.getByTestId('건너뛰기 button'));
      fireEvent.click(screen.getByTestId('건너뛰기 button'));
      fireEvent.click(screen.getByTestId('건너뛰기 button'));
      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      expect(screen.getByText('7 / 7')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('건너뛰기 button'));

      setTimeout(() => {
        expect(onClose).toHaveBeenCalled();
      }, 1000);
    });
  });
});
