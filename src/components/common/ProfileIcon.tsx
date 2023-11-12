import Image from 'next/image';

import styled from 'styled-components';
import { useDarkMode } from 'usehooks-ts';

type ProfileImgProps = {
  gender: 'MALE' | 'FEMALE';
  variant: 'circle' | 'square'
  img?: string;
};

export default function ProfileIcon({ gender, variant, img }: ProfileImgProps) {
  const { isDarkMode } = useDarkMode();
  const $size = variant === 'circle' ? 30 : 44;
  const $borderRadius = variant === 'circle' ? '50%' : '12px';
  const src = img ?? `/images/${isDarkMode ? 'black' : 'light'}-${gender.toLowerCase()}-icon.svg`;

  return (
    <ImgContainer $size={$size} $borderRadius={$borderRadius}>
      <ProfileImg
        src={src}
        alt="user profile picture"
        width={$size}
        height={$size}
      />
    </ImgContainer>
  );
}

const ImgContainer = styled.div<{ $size:number, $borderRadius:string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${({ $size }) => `${$size}px;`}
  height:  ${({ $size }) => `${$size}px;`}
  background-color: ${(props) => props.theme.color.componentBackground.bg03};
  border-radius: ${({ $borderRadius }) => `${$borderRadius};`};
  overflow: hidden;
`;

const ProfileImg = styled(Image)``;
