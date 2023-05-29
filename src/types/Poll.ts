import Candidate from '@/types/Candidate';
import Category from '@/types/Category';

type Poll = {
  questionId: number;
  content: string;
  categoryName: Category;
  candidates: Candidate[];
};

export default Poll;
