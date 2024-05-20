import { createRef } from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { useAnimate } from 'framer-motion';

import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

import CandidateList from './CandidateList';

jest.mock('framer-motion', () => ({
  useAnimate: jest.fn(),
}));

jest.useFakeTimers();
describe('CandidateList', () => {
  const ref = createRef();
  const onVote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAnimate as jest.Mock).mockImplementation(() => [ref, jest.fn()]);
  });
  const renderCandidateList = () => renderWithProviders(
    <CandidateList
      isChanged={given.isChanged}
      candidates={given.candidates}
      onVote={onVote}
    />,
  );

  context('isChanged가 false일 경우', () => {
    given('isChanged', () => false);
    given('candidates', () => fixtures.polls[2].candidates);

    it('앞의 4개 candidate 목록을 렌더링한다.', () => {
      renderCandidateList();

      expect(screen.getByText('이강호 클론')).toBeInTheDocument();
      expect(screen.getByText('리사')).toBeInTheDocument();
      expect(screen.getByText('이강호')).toBeInTheDocument();
      expect(screen.getByText('마지')).toBeInTheDocument();
    });

    it('candidate 버튼을 클릭시 goNextStep이 호출된다.', () => {
      renderCandidateList();

      const nameButton = screen.getByText('이강호');

      expect(screen.getByText('이강호')).toBeInTheDocument();

      fireEvent.click(nameButton);

      expect(onVote).toHaveBeenCalled();
    });
  });

  context('isChanged가 true일 경우', () => {
    given('isChanged', () => true);
    given('candidates', () => fixtures.polls[2].candidates);

    it('뒤에 4개의 candidate 목록을 렌더링한다.', () => {
      renderCandidateList();

      expect(screen.getByText('이재준')).toBeInTheDocument();
      expect(screen.getAllByAltText('candidate default icon').length).toBe(3);
    });
  });

  context('candidate가 4개 미만일때', () => {
    given('isChanged', () => false);
    given('candidates', () => fixtures.polls[0].candidates);

    it('모자란 개수만큼 빈 선택지가 나온다', () => {
      renderCandidateList();
      expect(screen.getAllByAltText('candidate default icon').length).toBe(4 - fixtures.polls[0].candidates.length);
    });
  });
});
