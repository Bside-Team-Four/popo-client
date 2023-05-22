import { screen } from '@testing-library/react';

import usePollStatus from '@/hooks/recoil/usePollStatus';
import { renderWithProviders } from '@/utils/testHelper';

import VoteButton from './VoteButton';

jest.mock('@/hooks/recoil/usePollStatus');

describe('VoteButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePollStatus as jest.Mock).mockImplementation(() => ({
      pollStatus: given.pollStatus,
    }));
  });

  const renderVoteButton = () => renderWithProviders(
    <VoteButton openPollPopup={jest.fn()} />,
  );

  context('pollStatus 가 start 상태일 때', () => {
    given('pollStatus', () => 'START');
    it('시작하기 text를 렌더링한다.', () => {
      renderVoteButton();

      expect(screen.getByRole('button', { name: '시작하기' })).toBeInTheDocument();
    });
  });

  context('pollStatus 가 start 상태가 아닐 때', () => {
    given('pollStatus', () => 'SLEEP');
    it('아무것도 렌더링하지 않는다.', () => {
      const { container } = renderVoteButton();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
