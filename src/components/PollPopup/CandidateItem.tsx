import Image from 'next/image';

import styled from 'styled-components';

import Candidate from '@/types/Candidate';

type CandidateItemProps = {
  candidate: Candidate;
  onClick: () => void;
};

export default function CandidateItem({ candidate, onClick }:CandidateItemProps) {
  return (
    <StudentButton onClick={onClick}>
      {candidate.name ? candidate.name : <CandidateDefaultIcon />}
    </StudentButton>
  );
}

const StudentButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.color.black}; 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  height: 76px;
  background-color: ${({ theme }) => theme.color.white};
  border-width: 0;
  border-radius: 20px;
  margin-bottom: 12px;
  &:active {
    background: rgba(251, 251, 251, 0.6);
    opacity: 0.6;
  }
`;

const CandidateDefaultIcon = styled(Image).attrs({
  src: '/images/candidate-default.svg',
  width: 36,
  height: 36,
  alt: 'candidate default icon',
  priority: true,
})``;
