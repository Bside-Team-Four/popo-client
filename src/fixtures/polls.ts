import Poll from '@/types/Poll';

const polls:Poll[] = [
  {
    questionId: 3,
    content: '1번 질문',
    categoryName: 'romance',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
    ],
  },
  {
    questionId: 4,
    content: '가장 잘 웃는 사람은?',
    categoryName: 'romance',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
    ],
  },
  {
    questionId: 5,
    content: '3번 질문',
    categoryName: 'friendship',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
      {
        userId: 6,
        name: '마지',
      },
      {
        userId: 4,
        name: '리사',
      },
    ],
  },
  {
    questionId: 6,
    content: '4번 질문',
    categoryName: 'private',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
      {
        userId: 6,
        name: '마지',
      },
      {
        userId: 4,
        name: '리사',
      },
    ],
  },
  {
    questionId: 7,
    content: '4번 질문',
    categoryName: 'romance',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
    ],
  },
  {
    questionId: 8,
    content: '5번 질문',
    categoryName: 'romance',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
    ],
  },
  {
    questionId: 9,
    content: '6번 질문',
    categoryName: 'romance',
    candidates: [
      {
        userId: 2,
        name: '이강호 클론',
      },
      {
        userId: 5,
        name: '리사',
      },
      {
        userId: 1,
        name: '이강호',
      },
    ],
  },
];

export default polls;
