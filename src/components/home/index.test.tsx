import { fireEvent, screen, waitFor } from '@testing-library/react';

import MockTheme from '@/test/MockTheme';
import PoPoState from '@/types/PoPoState';
import { renderWithPortal } from '@/utils/testHelper';

import Home from './index';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useInterval: jest.fn(),
  useIsMounted: () => true,
}));

describe('Home', () => {
  const renderHome = (currentPoPoState: PoPoState) => renderWithPortal(
    <MockTheme>
      <Home currentPoPoState={currentPoPoState} />
    </MockTheme>,
  );

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
