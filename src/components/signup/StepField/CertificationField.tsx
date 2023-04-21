import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type CertificationFieldProps = {
  certificationNumber: InputItem<string>;
};

export default function CertificationField({ certificationNumber }:CertificationFieldProps) {
  return (
    <TextField
      label="인증번호"
      placeholder="6자리 숫자"
      type="number"
      register={certificationNumber.register}
      value={certificationNumber.value}
      error={certificationNumber.error}
      onClickReset={certificationNumber.onClickReset}
    />
  );
}
