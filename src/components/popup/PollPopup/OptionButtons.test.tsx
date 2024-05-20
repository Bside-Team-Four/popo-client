import { fireEvent, screen } from '@testing-library/react';
import { useDarkMode } from 'usehooks-ts';

import OptionButtons from '@/components/popup/PollPopup/OptionButtons';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('usehooks-ts', () => ({
  useDarkMode: jest.fn(),
}));

describe('OptionButtons', () => {
  const setIsChanged = jest.fn();
  const onSkip = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDarkMode as jest.Mock).mockImplementation(() => ({ isDarkMode: given.isDarkMode }));
  });

  const renderOptionButtons = () => renderWithProviders(
    <OptionButtons
      isChanged={given.isChanged}
      setIsChanged={setIsChanged}
      onSkip={onSkip}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('바꾸기 버튼을 누르면 setIsChanged 함수가 호출된다.', () => {
    given('isChanged', () => false);
    given('isDarkMode', () => false);

    renderOptionButtons();

    const shuffleButton = screen.getByTestId('바꾸기 button');

    fireEvent.click(shuffleButton);

    expect(setIsChanged).toHaveBeenCalled();
  });

  it('건너뛰기 버튼을 누르면 goNextStep 함수가 호출된다.', () => {
    given('isDarkMode', () => false);
    renderOptionButtons();

    const skipButton = screen.getByTestId('건너뛰기 button');

    fireEvent.click(skipButton);

    expect(onSkip).toHaveBeenCalled();
  });

  context('isChanged가 false일 경우', () => {
    given('isChanged', () => false);
    given('isDarkMode', () => false);

    it('바꾸기 버튼이 활성화된다.', () => {
      renderOptionButtons();

      expect(screen.getByTestId('바꾸기 button')).not.toBeDisabled();
    });
  });

  context('isChanged가 true일 경우', () => {
    given('isChanged', () => true);
    given('isDarkMode', () => false);
    it('바꾸기 버튼이 비활성화된다.', () => {
      renderOptionButtons();

      expect(screen.getByTestId('바꾸기 button')).toBeDisabled();
    });
  });

  context('다크모드 일 때', () => {
    given('isChanged', () => false);
    given('isDarkMode', () => true);
    it('다크모드 아이콘을 렌더링한다.', () => {
      renderOptionButtons();

      expect(screen.getByAltText('바꾸기 icon')).toHaveAttribute('src', '/images/shuffle-icon-dark.svg');
      expect(screen.getByAltText('건너뛰기 icon')).toHaveAttribute('src', '/images/skip-icon-dark.svg');
    });
  });

  context('라이트모드 일 떄', () => {
    given('isChanged', () => false);
    given('isDarkMode', () => false);
    it('라이트모드 아이콘을 렌더링한다.', () => {
      renderOptionButtons();

      expect(screen.getByAltText('바꾸기 icon')).toHaveAttribute('src', '/images/shuffle-icon.svg');
      expect(screen.getByAltText('건너뛰기 icon')).toHaveAttribute('src', '/images/skip-icon.svg');
    });
  });
});
