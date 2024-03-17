import { usePathname, useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Header from './Header';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Header', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockImplementation(() => given.pathname);
    (useRouter as jest.Mock).mockImplementation(() => ({
      back: mockBack,
    }));
  });

  const rendeHeader = () => renderWithProviders(<Header title="설정" />);

  context('제목이 설정 일 때', () => {
    it('설정 타이틀이 보인다.', () => {
      rendeHeader();

      expect(screen.getByText('설정')).toBeInTheDocument();
    });
  });

  context('뒤로 가기 버튼을 누르면', () => {
    given('pathname', () => '/setting/tos');

    it('페이지가 뒤로간다.', () => {
      rendeHeader();

      fireEvent.click(screen.getByTestId('back-button'));

      expect(mockBack).toHaveBeenCalled();
    });
  });
});
