import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import GenderSelector from './GenderSelector';

describe('GenderSelector', () => {
  const onChangeGender = jest.fn();
  const renderGenderSelector = () => renderWithProviders(
    <GenderSelector
      value={given.value}
      onChangeGender={onChangeGender}
    />,
  );

  it('성별 선택시 성별이 변경되어야 한다.', () => {
    renderGenderSelector();

    const manButton = screen.getByText('남성');
    const womanButton = screen.getByText('여성');

    expect(manButton).toBeInTheDocument();
    expect(womanButton).toBeInTheDocument();

    fireEvent.click(manButton);
    expect(onChangeGender).toHaveBeenCalledWith('MALE');

    fireEvent.click(womanButton);
    expect(onChangeGender).toHaveBeenCalledWith('FEMALE');
  });

  context('성별이 선택되어 있을 때', () => {
    given('value', () => 'MALE');

    it('선택된 성별은 테두리(border)가 생겨야 한다.', () => {
      renderGenderSelector();

      const manBox = screen.getByTestId('man-box');

      expect(manBox).toHaveStyleRule('border', '1px solid #000000');
    });

    it('선택되지 않은 성별은 뿌옇게 되야 한다.', () => {
      renderGenderSelector();

      const womanBox = screen.getByTestId('woman-box');

      expect(womanBox).toHaveStyleRule('filter', 'blur(1px) grayscale(1)');
    });
  });
});
