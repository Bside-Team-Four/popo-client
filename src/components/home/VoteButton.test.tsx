import { screen } from '@testing-library/react';

import usePOPOState from '@/hooks/recoil/usePOPOState';
import { renderWithProviders } from '@/utils/testHelper';

import VoteButton from './VoteButton';

jest.mock('@/hooks/recoil/usePOPOState');

describe('VoteButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePOPOState as jest.Mock).mockImplementation(() => ({
      popoState: given.popoState,
    }));
  });

  const renderVoteButton = () => renderWithProviders(
    <VoteButton openPollPopup={jest.fn()} />,
  );

  context('state 가 start 상태일 때', () => {
    given('popoState', () => 'start');
    it('시작하기 text를 렌더링한다.', () => {
      renderVoteButton();

      expect(screen.getByRole('button', { name: '시작하기' })).toBeInTheDocument();
    });
  });

  context('state 가 start 상태가 아닐 때', () => {
    given('popoState', () => 'sleep');
    it('아무것도 렌더링하지 않는다.', () => {
      const { container } = renderVoteButton();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
