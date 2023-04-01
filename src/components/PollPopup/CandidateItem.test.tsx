import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import Candidate from '@/types/Candidate';
import { renderWithProviders } from '@/utils/testHelper';

import CandidateItem from './CandidateItem';

describe('CandidateItem', () => {
  const renderCandidateItem = (candidate: Candidate) => renderWithProviders(
    <CandidateItem
      candidate={candidate}
      onClick={jest.fn()}
    />,
  );

  context('candidate 의 name 이 있을 경우', () => {
    it('candidate 의 name 을 보여준다.', () => {
      renderCandidateItem(fixtures.candidate);

      expect(screen.getByText(fixtures.candidate.name)).toBeInTheDocument();
    });
  });

  context('candidate 의 name 이 없을 경우', () => {
    it('candidate default icon 을 보여준다.', () => {
      renderCandidateItem({ userId: 0, name: '' });

      expect(screen.getByAltText('candidate default icon')).toBeInTheDocument();
    });
  });
});
