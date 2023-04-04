import { screen } from '@testing-library/react';

import PoPoState from '@/types/PoPoState';
import { renderWithThemeProviders } from '@/utils/testHelper';

import VoteButton from './VoteButton';

describe('VoteButton', () => {
  const renderVoteButton = (state: PoPoState) => renderWithThemeProviders(
    <VoteButton openPollPopup={jest.fn()} state={state} />,
  );

  context('state 가 start 상태일 때', () => {
    it('시작하기 text를 렌더링한다.', () => {
      renderVoteButton('start');

      expect(screen.getByRole('button', { name: '시작하기' })).toBeInTheDocument();
    });
  });
  context('state 가 start 상태가 아닐 때', () => {
    it('아무것도 렌더링하지 않는다.', () => {
      const { container } = renderVoteButton('done');

      expect(container).toBeEmptyDOMElement();
    });
  });
});
