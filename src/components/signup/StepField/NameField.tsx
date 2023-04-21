import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type NameFieldProps = {
  name: InputItem<string>;
};

export default function NameField({ name }:NameFieldProps) {
  return (
    <TextField
      key={3}
      label="이름"
      placeholder="홍길O"
      type="text"
      register={name.register}
      value={name.value}
      error={name.error}
      onClickReset={name.onClickReset}
    />
  );
}
