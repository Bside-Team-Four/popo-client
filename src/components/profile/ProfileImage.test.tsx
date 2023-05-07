import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  const renderProfileImage = () => renderWithProviders(
    <ProfileImage gender={given.gender} profileImageUrl={given.profileImageUrl} />,
  );

  context('프로필 이미지가 없고', () => {
    given('profileImageUrl', () => '');

    context('성별이 남성일 때', () => {
      it('남성 기본 이미지가 렌더링 된다.', () => {
        given('gender', () => 0);
        renderProfileImage();

        const image = screen.getByAltText('profile default image');

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/images/profile-male.svg');
      });
    });

    context('성별이 여성일 때', () => {
      it('여성 기본 이미지가 렌더링 된다.', () => {
        given('gender', () => 1);
        renderProfileImage();

        const image = screen.getByAltText('profile default image');

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/images/profile-female.svg');
      });
    });
  });

  context('프로필 이미지가 있을 때', () => {
    given('profileImageUrl', () => '/images/test-profile.svg');

    it('프로필 이미지가 렌더링 된다.', () => {
      renderProfileImage();

      const image = screen.getByAltText('profile image');

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/test-profile.svg');
      expect(image).toHaveStyleRule('border-radius', '100px');
    });
  });
});
