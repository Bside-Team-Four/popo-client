import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Error from './index';

describe('Error', () => {
  const onClick = jest.fn();

  const renderNotFound = () => renderWithProviders(
    <Error onClick={onClick} />,
  );

  it('에러 텍스트를 화면에 보여준다.', () => {
    renderNotFound();

    expect(screen.getByText('Error!!!')).toBeInTheDocument();
  });

  it('다시 불러오기 버튼 클릭 시 페이지를 다시 불러온다.', () => {
    renderNotFound();

    fireEvent.click(screen.getByText('다시 불러오기'));

    expect(onClick).toHaveBeenCalled();
  });
});
