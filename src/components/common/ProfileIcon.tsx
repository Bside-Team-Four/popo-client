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
        src={`/images/profile-${gender}.svg`}
        alt="user profile picture"
        width={15}
        height={15}
      />
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.color.componentBackground.bg03};
  border-radius: 50%;
`;

const ProfileImg = styled(Image)``;
