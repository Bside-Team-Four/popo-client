import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import ProfileHeader from './ProfileHeader';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('ProfileHeader', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  const renderProfileHeader = () => renderWithProviders(<ProfileHeader />);

  it('설정 아이콘을 화면에 보여준다.', () => {
    renderProfileHeader();

    expect(screen.getByAltText('setting icon')).toBeInTheDocument();
  });

  it('설정 아이콘을 클릭하면 설정 페이지로 이동한다.', () => {
    renderProfileHeader();

    const settingIcon = screen.getByAltText('setting icon');

    fireEvent.click(settingIcon);

    expect(pushMock).toHaveBeenCalledWith('/setting');
  });
});
