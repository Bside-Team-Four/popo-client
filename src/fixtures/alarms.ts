import Alarm from '@/types/Alarm';

const alarms: Alarm[] = [
  {
    title: '우리반의 분위기 메이커는 누구야',
    createdAt: '1분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
    hints: [
      {
        hintTitle: '랜덤 초성',
        hintContent: 'ㄱ',
        hintId: 1,
      },
    ],
  },
  {
    title: '우리반의 제일 개구쟁이가 누구야?',
    createdAt: '5분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '여성',
      schoolInfo: '쌍문고',
      gradeInfo: '3학년',
    },
    hints: [
      {
        hintTitle: '랜덤 초성',
        hintContent: 'ㄱ',
        hintId: 2,
      },
      {
        hintTitle: '초성 위치',
        hintContent: '두 번째',
        hintId: 3,
      },
    ],
  },
  {
    title: '우리반의 분위기 메이커는 누구야 우리반의 분위기 메이커는 누구야 우리반의 분위기 메이커는 누구야 우리반의 분위기 메이커는 누구야',
    createdAt: '12분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
  },
  {
    title: '우리반의 분위기 메이커는 누구야',
    createdAt: '17분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
  },
  {
    title: '우리반의 분위기 메이커는 누구야',
    createdAt: '30분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
  },
  {
    title: '우리반의 분위기 메이커는 누구야',
    createdAt: '32분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
  },
  {
    title: '우리반의 제일 개구쟁이가 누구야?',
    createdAt: '45분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '여성',
      schoolInfo: '쌍문고',
      gradeInfo: '3학년',
    },
  },
  {
    title: '우리반의 분위기 메이커는 누구야',
    createdAt: '50분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '남성',
      schoolInfo: '휘문고',
      gradeInfo: '1학년',
    },
  },
  {
    title: '우리반의 제일 개구쟁이가 누구야?',
    createdAt: '60분전', // @TO DO: epoch타임으로 response올 시 변환 필요
    userInfo: {
      gender: '여성',
      schoolInfo: '쌍문고',
      gradeInfo: '3학년',
    },
  },
];

export default alarms;
