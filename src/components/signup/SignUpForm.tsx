import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';
import Gender from '@/types/Gender';
import InputItem from '@/types/InputForm';
import School from '@/types/School';

import CertificationField from './StepField/CertificationField';
import ConfirmField from './StepField/ConfirmField';
import EmailField from './StepField/EmailField';
import GenderSelector from './StepField/GenderSelector';
import NameField from './StepField/NameField';
import PasswordField from './StepField/PasswordField';
import SchoolField from './StepField/SchoolField';
import TosField from './StepField/TosField';
import YearField from './StepField/YearField';

type SignUpFormProps = {
  step: number;
  formData:{
    tosAgree: {
      value: boolean;
      onChangeTosAgree: (agree:boolean) => void;
    }
    email: InputItem<string>;
    certificationNumber: InputItem<string>;
    password: InputItem<string>;
    passwordConfirm: InputItem<string>;
    name: InputItem<string>;
    year: InputItem<number>;
    grade: InputItem<number>;
    gender: {
      value: Gender | null;
      onChangeGender: (g:Gender) => void;
    }
    school:{
      value: School | null;
      onChangeSchool: (s:School) => void;
    }
  };
  onResend: () => void;
};

export default function SignUpForm({ step, formData, onResend }:SignUpFormProps) {
  const {
    tosAgree, email, certificationNumber, password,
    passwordConfirm, name, year, grade, gender, school,
  } = formData;

  const renderData = [
    <TosField key={0} value={tosAgree.value} onChange={tosAgree.onChangeTosAgree} />,
    <EmailField key={1} email={email} />,
    <>
      <CertificationField key={2} certificationNumber={certificationNumber} />
      <SmallButton onClick={onResend}>인증번호 재전송</SmallButton>
    </>,
    <PasswordField key={3} password={password} passwordConfirm={passwordConfirm} />,
    <NameField key={4} name={name} />,
    <YearField key={5} year={year} />,
    <GenderSelector
      key={6}
      value={gender.value}
      onChangeGender={gender.onChangeGender}
    />,
    <SchoolField key={7} school={school} grade={grade} />,
    <ConfirmField key={8} name={name} year={year} gender={gender} school={school} grade={grade} />,
  ];

  return (
    <Container>
      {renderData[step]}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
