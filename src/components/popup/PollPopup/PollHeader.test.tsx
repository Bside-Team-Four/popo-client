import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import PollHeader from './PollHeader';

describe('PollHeader', () => {
  const onClose = jest.fn();

  const renderPollHeader = () => renderWithProviders(
    <PollHeader
      currentStep={2}
      stepCount={7}
      onClose={onClose}
    />,
  );

  beforeEach(() => {
    onClose.mockClear();
  });

  it('총 step과 현재 step을 잘 렌더링한다.', () => {
    renderPollHeader();

    expect(screen.getByText('3 / 7')).toBeInTheDocument();
  });

  it('onClosePollPopup 함수가 close icon을 클릭했을 때 실행된다.', () => {
    renderPollHeader();

    const closeIcon = screen.getByAltText('close icon');
    fireEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalled();
  });
});
