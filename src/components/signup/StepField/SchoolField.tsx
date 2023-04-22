import { useState } from 'react';

import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import SchoolPopup from '@/components/popup/SchoolPopup';
import InputItem from '@/types/InputForm';
import School from '@/types/School';

type SchoolFieldProps = {
  school:{
    value: School | null;
    onChangeSchool: (s:School) => void;
  },
  grade: InputItem<number>;
};

export default function SchoolField({ school, grade }: SchoolFieldProps) {
  const [showPop, setShowPop] = useState(false);

  const onShowPop = () => setShowPop(true);
  const onClosePop = () => setShowPop(false);

  return (
    <Container>
      <TextField
        label="학교"
        type="text"
        placeholder="OO 학교"
        value={school.value?.name || ''}
        message="원활한 서비스 이용을 위해 꼭 정확한 정보를 입력해주세요."
        onClick={onShowPop}
        readOnly
      />
      <TextField
        label="학년"
        type="number"
        placeholder="1~3"
        register={grade.register}
        value={grade.value}
        error={grade.error}
        onClickReset={grade.onClickReset}
        message="학년은 3월 2일 이후 자동으로 업데이트 되요!"
      />
      <SchoolPopup show={showPop} onClose={onClosePop} onChangeSchool={school.onChangeSchool} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  :nth-child(1){
    margin-bottom: 8px;
  };
`;
