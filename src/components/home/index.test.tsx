import { fireEvent, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import fixtures from '@/fixtures';
import useGetPolls from '@/hooks/api/useGetPolls';
import popoState from '@/store/popo';
import MockTheme from '@/test/MockTheme';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { renderWithPortal } from '@/utils/testHelper';

import Home from './index';

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useDarkMode: () => ({ isDarkMode: false }),
  useInterval: jest.fn(),
}));

jest.mock('@/hooks/api/useGetPolls');

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetPolls as jest.Mock).mockImplementation(() => ({
      data: {
        totalQuestionCount: 2,
        userCurrentIndex: 1,
        polls: fixtures.polls,
      },
    }));
  });

  const renderHome = () => renderWithPortal(
    <ReactQueryWrapper>
      <RecoilRoot initializeState={({ set }) => set(popoState, 'START')}>
        <MockTheme>
          <Home />
        </MockTheme>
      </RecoilRoot>
    </ReactQueryWrapper>,
    'full-portal-root',
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
