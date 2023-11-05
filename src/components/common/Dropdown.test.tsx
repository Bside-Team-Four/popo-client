import { fireEvent, screen } from '@testing-library/react';

import Dropdown from '@/components/common/Dropdown';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('Dropdown', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
    { label: 'option3', value: 'option3' },
  ];

  const renderDropdown = () => renderWithProviders(
    <Dropdown
      options={options}
      value={options[0].value}
      onChange={onChange}
    />,
  );

  it('기본값을 보여준다.', () => {
    renderDropdown();
    expect(screen.getByText('option1')).toBeInTheDocument();
  });

  it('사용자가 선택하면 선택한 값으로 변경된다.', () => {
    renderDropdown();
    fireEvent.change(screen.getByTestId('dropdown'), { target: { value: 'option2' } });
    expect(screen.getByText('option2')).toBeInTheDocument();
  });
});
