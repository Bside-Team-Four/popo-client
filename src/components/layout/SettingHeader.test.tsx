import { usePathname, useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SettingHeader from './SettingHeader';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('SettingHeader', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockImplementation(() => given.pathname);
    (useRouter as jest.Mock).mockImplementation(() => ({
      back: mockBack,
    }));
  });

  const renderSettingHeader = () => renderWithProviders(<SettingHeader />);

  context('현재 주소가 /setting/tos 일 때', () => {
    given('pathname', () => '/setting/tos');

    it('이용약관 타이틀이 보인다.', () => {
      renderSettingHeader();

      expect(screen.getByText('이용약관')).toBeInTheDocument();
    });
  });

  context('현재 주소가 setting에 속하지 않을 경우', () => {
    given('pathname', () => null);

    it('기본 타이틀이 보인다.(설정)', () => {
      renderSettingHeader();

      expect(screen.getByText('설정')).toBeTruthy();
    });
  });

  context('뒤로 가기 버튼을 누르면', () => {
    given('pathname', () => '/setting/tos');

    it('페이지가 뒤로간다.', () => {
      renderSettingHeader();

      fireEvent.click(screen.getByTestId('back-button'));

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
