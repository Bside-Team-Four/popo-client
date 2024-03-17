import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Checkbox from './Checkbox';

jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
}));

describe('Checkbox', () => {
  const onChange = jest.fn();

  const renderCheckbox = () => renderWithProviders(
    <Checkbox
      text="체크박스"
      checked={given.checked}
      onChange={onChange}
    />,
  );

  it('체크박스 텍스트를 나타낸다.', () => {
    given('checked', () => false);
    renderCheckbox();

    expect(screen.getByText(/체크박스/)).toBeInTheDocument();
  });

  it('체크박스를 클릭하면 onChange 함수가 실행된다.', () => {
    given('checked', () => false);
    renderCheckbox();

    screen.getByText(/체크박스/).click();
    expect(onChange).toHaveBeenCalled();
  });
});
