import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SearchField from './SearchField';

const options = [
  { label: 'option1', value: 'option1' },
  { label: 'option2', value: 'option2' },
  { label: 'option3', value: 'option3' },
];

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('SearchField', () => {
  const setKeyword = jest.fn();
  const onChange = jest.fn();

  const renderSearchField = () => renderWithProviders(
    <SearchField
      keyword=""
      setKeyword={setKeyword}
      placeholder="검색"
    />,
  );

  const renderSearchFieldWithDropdown = () => renderWithProviders(
    <SearchField>
      <SearchField.Dropdown options={options} value="option1" onChange={onChange} />
      <SearchField.Input
        keyword=""
        setKeyword={setKeyword}
        placeholder="검색"
      />
    </SearchField>,
  );

  it('검색어를 입력하면 setKeyword 함수가 호출된다.', () => {
    renderSearchField();

    const input = screen.getByPlaceholderText('검색');

    fireEvent.input(input, { target: { value: '검색어' } });

    expect(setKeyword).toHaveBeenCalledWith('검색어');
  });

  it('드롭박스와 함께 렌더된다.', () => {
    renderSearchFieldWithDropdown();
    expect(screen.getByText('option1')).toBeInTheDocument();
  });
});
