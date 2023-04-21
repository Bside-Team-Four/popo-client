import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type YearFieldProps = {
  year: InputItem<number>;
};

export default function YearField({ year }:YearFieldProps) {
  return (
    <TextField
      label="태어난 년도"
      placeholder="2023"
      type="number"
      register={year.register}
      value={year.value}
      error={year.error}
      onClickReset={year.onClickReset}
    />
  );
}
