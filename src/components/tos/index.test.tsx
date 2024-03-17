import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Tos from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Tos', () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
    }));
  });

  const renderTos = () => renderWithProviders(<Tos />);

  context('POPO 서비스 이용약관을 클릭했을 때', () => {
    it('POPO 서비스 이용약관 페이지로 이동한다.', () => {
      renderTos();

      const settingItem = screen.getByText('POPO 서비스 이용약관');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/tos/use');
    });
  });

  context('POPO 개인정보 처리방침을 클릭했을 때', () => {
    it('POPO 개인정보 처리방침 페이지로 이동한다.', () => {
      renderTos();

      const settingItem = screen.getByText('개인정보처리방침');

      expect(settingItem).toBeInTheDocument();

      fireEvent.click(settingItem);

      expect(routerPush).toHaveBeenCalledWith('/tos/privacy');
    });
  });
});
