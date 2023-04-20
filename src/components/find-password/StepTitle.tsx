import SignTitle from '@/components/common/SignTitle';

type StepTitleProps = {
  step: number;
};

const stepTitles = [
  '가입한 이메일을\n입력해주세요',
  '이메일로 받은 인증번호를\n입력해주세요',
  '새로운 비밀번호를\n입력해주세요',
];

const getTitle = (step:number) => stepTitles[step];

export default function StepTitle({ step }: StepTitleProps) {
  return <SignTitle>{getTitle(step)}</SignTitle>;
}
