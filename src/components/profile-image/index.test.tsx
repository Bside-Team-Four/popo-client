import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import ProfileImage from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SettingButtons', () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
    }));
  });

  const renderProfileImage = () => renderWithProviders(<ProfileImage />);

  it('타이틀을 보여준다.', () => {
    renderProfileImage();

    expect(screen.getByText(/프로필 사진/)).toBeInTheDocument();
  });

  it('확인 버튼을 눌렀을 때 화면을 이동한다', () => {
    renderProfileImage();

    const okButton = screen.getByText('확인');

    expect(okButton).toBeInTheDocument();

    fireEvent.click(okButton);

    expect(routerPush).toHaveBeenCalledWith('/');
  });

  it('스킵 버튼을 눌렀을 때 화면을 이동한다', () => {
    renderProfileImage();

    const skipButton = screen.getByText('다음에 할래요');

    expect(skipButton).toBeInTheDocument();

    fireEvent.click(skipButton);

    expect(routerPush).toHaveBeenCalledWith('/');
  });
});
