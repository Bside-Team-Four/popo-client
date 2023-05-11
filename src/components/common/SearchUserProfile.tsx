import Image from 'next/image';

import styled from 'styled-components';

interface ProfileImgProps {
  gender?: string;
  src?: string;
  size?: number;
}

export default function SearchUserProfile({ gender, src, size }: ProfileImgProps) {
  return (
    <ImgContainer size={size || 40}>
      <ProfileImg
        src={src || `/images/profile-${gender}.svg`}
        alt="user profile picture"
        width={15}
        height={15}
      />
    </ImgContainer>
  );
}

const ImgContainer = styled.div<{ size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size || '30'}px;
  height: ${(props) => props.size || '30'}px;
  background-color: ${(props) => props.theme.color.componentBackground.bg03};
  border-radius: 12px;
  padding: 14px;
`;

const ProfileImg = styled(Image)``;
