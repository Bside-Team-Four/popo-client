import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import ProfileSetting from './index';

describe('ProfileSetting', () => {
  const renderProfileSetting = () => renderWithProviders(<ProfileSetting />);

  it('프로필 정보를 화면에 보여준다.', () => {
    renderProfileSetting();

    expect(screen.getByDisplayValue('Test POPO')).toBeInTheDocument();
    expect(screen.getByDisplayValue('18세')).toBeInTheDocument();
    expect(screen.getByDisplayValue('포포 고등학교')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1학년')).toBeInTheDocument();
    expect(screen.getByDisplayValue('popo@gmail.com')).toBeInTheDocument();
  });
});
