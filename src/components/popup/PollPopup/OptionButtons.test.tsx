import { fireEvent, screen } from '@testing-library/react';

import OptionButtons from '@/components/popup/PollPopup/OptionButtons';
import { renderWithThemeProviders } from '@/utils/testHelper';

describe('OptionButtons', () => {
  const setIsChanged = jest.fn();
  const goNextStep = jest.fn();

  const renderOptionButtons = () => renderWithThemeProviders(
    <OptionButtons
      isChanged={given.isChanged}
      setIsChanged={setIsChanged}
      goNextStep={goNextStep}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('바꾸기 버튼을 누르면 setIsChanged 함수가 호출된다.', () => {
    given('isChanged', () => false);

    renderOptionButtons();

    const shuffleButton = screen.getByTestId('바꾸기 button');

    fireEvent.click(shuffleButton);

    expect(setIsChanged).toHaveBeenCalled();
  });

  it('건너뛰기 버튼을 누르면 goNextStep 함수가 호출된다.', () => {
    renderOptionButtons();

    const skipButton = screen.getByTestId('건너뛰기 button');

    fireEvent.click(skipButton);

    expect(goNextStep).toHaveBeenCalled();
  });

  context('isChanged가 false일 경우', () => {
    given('isChanged', () => false);

    it('바꾸기 버튼이 활성화된다.', () => {
      renderOptionButtons();

      expect(screen.getByTestId('바꾸기 button')).not.toBeDisabled();
    });
  });

  context('isChanged가 true일 경우', () => {
    given('isChanged', () => true);
    it('바꾸기 버튼이 비활성화된다.', () => {
      renderOptionButtons();

      expect(screen.getByTestId('바꾸기 button')).toBeDisabled();
    });
  });
});
