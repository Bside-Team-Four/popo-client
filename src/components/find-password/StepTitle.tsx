import SignTitle from '@/components/common/SignTitle';

type StepTitleProps = {
  step: number;
};

const getTitle = (step:number) => {
  if (step === 0) {
    return '가입한 이메일을\n입력해주세요';
  }
  if (step === 1) {
    return '이메일로 받은 인증번호를\n입력해주세요';
  }
  return '새로운 비밀번호를\n입력해주세요';
};

export default function StepTitle({ step }: StepTitleProps) {
  return <SignTitle>{getTitle(step)}</SignTitle>;
}
