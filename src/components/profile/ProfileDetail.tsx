import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';
import RewardSVG from '@/lib/assets/popo-reward-icon.svg';
import { getCalAppWidth } from '@/utils/sizeHelper';

import ProfileImage from './ProfileImage';

type ProfileDetailProps = {
  userName: string;
  schoolName: string;
  grade: number;
  reward: number;
  gender:number;
  profileImageUrl: string;
};

const getDefaultGenderText = (gender:number) => (gender === 0 ? '남자' : '여자');

export default function ProfileDetail({
  userName,
  schoolName,
  grade,
  reward,
  gender,
  profileImageUrl,
}:ProfileDetailProps) {
  // TODO: 링크 관련 기획 이후 추가(Toast 포함)
  const handleCopyLink = () => {
    // eslint-disable-next-line no-console
    console.log('복사');
  };

  return (
    <Container>
      <ProfileImage gender={gender} profileImageUrl={profileImageUrl} />
      <DetailWrapper>
        <UserName>{userName}</UserName>
        <UserSchoolAndGrade>{`${schoolName} ${grade}학년 ${getDefaultGenderText(gender)}`}</UserSchoolAndGrade>
        <RewardWrapper>
          <RewardIcon />
          <RewardText>{`${reward} PPP`}</RewardText>
        </RewardWrapper>
        <CopyButton onClick={handleCopyLink}>프로필 공유</CopyButton>
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 124px;
  margin-bottom: 32px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 124px;
  width: ${getCalAppWidth((w) => w - 134)}px;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text.title01};
`;

const UserSchoolAndGrade = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.subTitle01};
  margin-bottom: 12px;
`;

const RewardWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const RewardIcon = styled(RewardSVG)`
  margin-right: 4px;
  circle{
    fill: ${({ theme }) => theme.color.primary};
  };
`;

const RewardText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: ${({ theme }) => theme.color.text.subTitle01};
`;

const CopyButton = styled(SmallButton)`
  width: 100%;
`;
