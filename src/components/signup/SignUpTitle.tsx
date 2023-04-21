import SignTitle from '@/components/common/SignTitle';

type SignUpTitleProps = {
  step: number;
};

const stepTitles = [
  '가입할 이메일을\n입력해주세요',
  '이메일로 받은 인증번호를\n입력해주세요',
  '로그인에 사용할 비밀번호를\n입력해주세요',
  '이름을\n알려주세요',
  '태어난 년도를\n알려주세요',
  '성별을\n알려주세요',
  '학교와 학년을\n알려주세요',
  '입력한 정보를\n확인해주세요',
];

const getTitle = (step:number) => stepTitles[step];

export default function SignUpTitle({ step }: SignUpTitleProps) {
  return <SignTitle>{getTitle(step)}</SignTitle>;
}
