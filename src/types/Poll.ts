import Candidate from '@/types/Candidate';

type Poll = {
  questionId: number;
  content: string;
  // TODO: Category 가 기획쪽에서 정해지면 Type 으로 빼야할듯
  categoryName: string;
  candidates: Candidate[];
};

export default Poll;
