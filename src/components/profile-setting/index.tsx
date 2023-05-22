import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import fixtures from '@/fixtures';

export default function ProfileSetting() {
  const { profile } = fixtures;

  return (
    <Container>
      <TextField label="이름" value={profile.userName} readOnly />
      <TextField label="나이" value={`${profile.age}세`} readOnly />
      <TextField label="학교" value={profile.schoolName} readOnly />
      <TextField label="학년" value={`${profile.grade}학년`} readOnly />
      <TextField label="이메일" value={profile.email} readOnly />
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
