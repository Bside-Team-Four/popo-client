import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import Gender from '@/types/Gender';
import InputItem from '@/types/InputForm';
import School from '@/types/School';

type ConfirmFieldProps = {
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

export default function ConfirmField({
  name, year, grade, gender, school,
}:ConfirmFieldProps) {
  return (
    <Container>
      <TextField label="이름" value={name.value} readOnly />
      <TextField label="출생년도" value={year.value} readOnly />
      <TextField label="성별" value={gender.value === 'MALE' ? '남성' : '여성'} readOnly />
      <TextField label="학교" value={school.value?.name || ''} readOnly />
      <TextField label="학년" value={grade.value} readOnly />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
