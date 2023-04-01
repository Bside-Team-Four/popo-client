import Image from 'next/image';

import styled from 'styled-components';

interface ProfileImgProps {
  gender: string;
}

export default function ProfileIcon({ gender }: ProfileImgProps) {
  return (
    <ImgContainer>
      {/*
       * 프로필 데이터가있으면 해당 이미지를 크기에 맞게 크롭해서 넣어주기
       * 혹은 디폴트 프로필이미지를 넣어줌(profile-red.svg 혹은 profile-blue.svg)
       */}
      <ProfileImg
        src={`/images/profile-${gender.toLowerCase()}.svg`}
        alt="user profile picture"
        width={44}
        height={44}
      />
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled(Image)``;
