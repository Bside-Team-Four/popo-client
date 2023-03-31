import {
  fireEvent, screen, waitFor,
} from '@testing-library/react';

import MockTheme from '@/test/MockTheme';
import RabbitState from '@/types/RabbitState';
import { renderWithPortal } from '@/utils/testHelper';

import Home from './index';

describe('Home', () => {
  const renderHome = (currentRabbitState: RabbitState) => renderWithPortal(
    <MockTheme>
      <Home currentRabbitState={currentRabbitState} />
    </MockTheme>,
  );

  context('currentRabbitState가 start일 때', () => {
    it('Timer icon을 출력한다.', () => {
      renderHome('start');

      expect(screen.getByAltText('timer icon')).toBeInTheDocument();
    });
  });

  context('currentRabbitState가 start가 아닐 때', () => {
    it('Empty div를 출력한다.', () => {
      renderHome('done');

      expect(screen.getByTestId('empty div')).toBeInTheDocument();
    });
  });

  it('opens the PollPopup component when the VoteButton is clicked', async () => {
    renderHome('start');

    const voteButton = screen.getByRole('button', { name: '시작하기' });

    fireEvent.click(voteButton);

    expect(screen.getByAltText('close icon')).toBeInTheDocument();
  });

  it('closes the PollPopup component when the onClose function is called', async () => {
    renderHome('start');

    const voteButton = screen.getByRole('button', { name: '시작하기' });

    fireEvent.click(voteButton);

    const closeButton = screen.getByAltText('close icon');

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });
  });
});
