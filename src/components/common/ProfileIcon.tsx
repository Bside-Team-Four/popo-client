import Image from 'next/image';

import styled from 'styled-components';

type ProfileImgProps = {
  gender: string;
};

export default function ProfileIcon({ gender }: ProfileImgProps) {
  return (
    <ImgContainer>
      <ProfileImg
        src={`/images/profile-${gender}.svg`}
        alt="user profile picture"
        width={30}
        height={30}
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
  overflow: hidden;
`;

const ProfileImg = styled(Image)``;
