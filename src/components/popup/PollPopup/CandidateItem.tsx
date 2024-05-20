import Image from 'next/image';

import styled from 'styled-components';

import Candidate from '@/types/Candidate';

type CandidateItemProps = {
  candidate: Candidate;
  onClick: () => void;
};

export default function CandidateItem({ candidate, onClick }:CandidateItemProps) {
  return (
    <Wrapper onClick={onClick}>
      {candidate.name}
    </Wrapper>
  );
}

function EmptyCandidateItem() {
  return (
    <Wrapper>
      <CandidateDefaultIcon />
    </Wrapper>
  );
}

CandidateItem.Empty = EmptyCandidateItem;

const Wrapper = styled.button`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 76px;
  border: none;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-shadow: inset 0 4px 2px ${({ theme }) => theme.color.componentBackground.boxShadow};
  color: ${({ theme }) => theme.color.text.title01};
  background-color: ${({ theme }) => theme.color.componentBackground.bg01};
  &:active {
    background: ${({ theme }) => theme.color.btnPress};
    opacity: 0.3;
  };
`;

const CandidateDefaultIcon = styled(Image).attrs({
  src: '/images/candidate-default.svg',
  width: 36,
  height: 36,
  alt: 'candidate default icon',
  priority: true,
})``;
