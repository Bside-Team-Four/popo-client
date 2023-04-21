import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type EmailFieldProps = {
  email: InputItem<string>;
};

export default function EmailField({ email }:EmailFieldProps) {
  return (
    <TextField
      label="이메일"
      placeholder="이메일"
      type="text"
      register={email.register}
      value={email.value}
      error={email.error}
      onClickReset={email.onClickReset}
    />
  );
}
