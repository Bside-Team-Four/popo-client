import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import NotHistory from './NotHistory';

describe('NotHistory', () => {
  it('이용내역 없음 이미지와 텍스트를 화면에 보여준다.', () => {
    renderWithProviders(<NotHistory />);

    expect(screen.getByText('이용내역이 없어요')).toBeInTheDocument();
    expect(screen.getByAltText('not history image')).toBeInTheDocument();
  });
});
