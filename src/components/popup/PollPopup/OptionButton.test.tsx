import { screen } from '@testing-library/react';

import { renderWithThemeProviders } from '@/utils/testHelper';

import OptionButton from './OptionButton';

describe('OptionButton', () => {
  const renderOptionButton = () => renderWithThemeProviders(<OptionButton
    text="바꾸기"
    imgSrc="/images/poll/poll_change.png"
    size={{ width: 24, height: 24 }}
    onClick={jest.fn()}
  />);

  it('props로 받은 데이터를 잘 렌더링한다.', () => {
    renderOptionButton();

    expect(screen.getByText('바꾸기')).toBeInTheDocument();
    expect(screen.getByAltText('바꾸기 icon')).toBeInTheDocument();
  });
});
