import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import useGetMyProfile from '@/hooks/api/useGetMyProfile';

import FixedSpinner from '../common/FixedSpinner';
import LoadingHandler from '../common/LoadingHandler';

export default function ProfileSetting() {
  const {
    isLoading, data = {
      userName: '',
      schoolName: '',
      grade: 0,
      email: '',
    },
  } = useGetMyProfile();

  return (
    <Container>
      <LoadingHandler isLoading={isLoading || !data} loadingComponent={<FixedSpinner type="normal" />}>
        <TextField label="이름" value={data.userName} readOnly key="userName" />
        <TextField label="학교" value={data.schoolName} readOnly key="schoolName" />
        <TextField label="학년" value={`${data.grade}학년`} readOnly key="grade" />
        <TextField label="이메일" value={data.email} readOnly />
      </LoadingHandler>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 0 24px;
`;
