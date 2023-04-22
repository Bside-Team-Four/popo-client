import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SearchField from './SearchField';

describe('SearchField', () => {
  const setKeyword = jest.fn();

  const renderSearchField = (onClose?: () => void) => renderWithProviders(
    <SearchField
      keyword=""
      setKeyword={setKeyword}
      placeholder="검색"
      onClose={onClose}
    />,
  );

  context('팝업 닫기 이벤트(onClose)를 props로 받지 않았을 경우', () => {
    it('취소 버튼이 보이지 않는다.', () => {
      renderSearchField();

      expect(screen.queryByText('취소')).not.toBeInTheDocument();
    });
  });

  context('팝업 닫기 이벤트(onClose)를 props로 받았을 경우', () => {
    it('취소 버튼이 보이지 않는다.', () => {
      renderSearchField(jest.fn());

      expect(screen.getByText('취소')).toBeInTheDocument();
    });
  });

  it('검색어를 입력하면 setKeyword 함수가 호출된다.', () => {
    renderSearchField();

    const input = screen.getByPlaceholderText('검색');

    fireEvent.input(input, { target: { value: '검색어' } });

    expect(setKeyword).toHaveBeenCalledWith('검색어');
  });
});
