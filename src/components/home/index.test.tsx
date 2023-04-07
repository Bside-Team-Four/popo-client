import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import popoState from '@/store/popo';
import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

import Home from './index';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useInterval: jest.fn(),
  useIsMounted: () => true,
}));

describe('Home', () => {
  const renderHome = () => renderWithPortal(
    <RecoilRoot initializeState={({ set }) => set(popoState, 'start')}>
      <MockTheme>
        <Home />
      </MockTheme>
    </RecoilRoot>,
  );

  it('opens the PollPopup component when the VoteButton is clicked', async () => {
    renderHome();

    const voteButton = screen.getByRole('button', { name: '시작하기' });

    fireEvent.click(voteButton);

    expect(screen.getByAltText('close icon')).toBeInTheDocument();
  });

  it('closes the PollPopup component when the onClose function is called', async () => {
    renderHome();

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
