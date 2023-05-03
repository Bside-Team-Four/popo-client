import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import NotFound from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NotFound', () => {
  const routerReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: routerReplace,
    });
  });

  const renderNotFound = () => renderWithProviders(
    <NotFound />,
  );

  it('404 이미지와 텍스트를 화면에 보여준다.', () => {
    renderNotFound();

    expect(screen.getByAltText('not found image')).toBeInTheDocument();
    expect(screen.getByText('페이지를 찾을 수 없어요')).toBeInTheDocument();
  });

  it('홈으로 돌아가기 버튼 클릭 시 홈으로 이동한다.', () => {
    renderNotFound();

    fireEvent.click(screen.getByText('홈으로 돌아가기'));

    expect(routerReplace).toHaveBeenCalledWith('/');
  });
});
