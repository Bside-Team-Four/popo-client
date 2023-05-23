import Image from 'next/image';

import styled, { css } from 'styled-components';

import Gender from '@/types/Gender';

type ProfileImageProps = {
  gender: Gender;
  profileImageUrl: string;
};

const getDefaultGenderIcon = (gender: Gender) => (gender.toLowerCase());

export default function ProfileImage({ gender, profileImageUrl }:ProfileImageProps) {
  return (
    <Container $hasImage={!!profileImageUrl}>
      {
            profileImageUrl ? (
              <PImage
                src={profileImageUrl}
                alt="profile image"
                priority
                fill
                $hasImage
              />
            ) : (
              <PImage
                src={`/images/profile-${getDefaultGenderIcon(gender)}.svg`}
                alt="profile default image"
                width={24}
                height={24}
                priority
              />
            )
        }
    </Container>
  );
}

const Container = styled.div<{ $hasImage: boolean }>`
  position: relative;
  display: flex;
  width: 72px;
  height: 72px;
  border-radius: 100px;
  margin-right: 14px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  ${({ $hasImage }) => (!$hasImage && css`
    align-items: center;
    justify-content: center;
  `)}
`;

const PImage = styled(Image)<{ $hasImage?: boolean }>`
  ${({ $hasImage }) => $hasImage && css`
    border-radius: 100px;
  `}
`;
