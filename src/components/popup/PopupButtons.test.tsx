import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import PopupButtons from './PopupButtons';

describe('PopupButtons', () => {
  const onMockClose = jest.fn();
  const onMockOk = jest.fn();
  const renderPopupButtons = (cancelText?:string, onOk?: ()=>void) => renderWithProviders(
    <PopupButtons
      okText="확인"
      cancelText={cancelText}
      onOk={onOk}
      onClose={onMockClose}
    />,
  );

  it('PopupButtons는 기본적으로 확인 버튼을 렌더링한다.', () => {
    renderPopupButtons();
    expect(screen.getByText(/확인/)).toBeInTheDocument();
  });

  it('closeText(취소 텍스트)가 있을 때 취소 버튼을 렌더링한다.', () => {
    renderPopupButtons('취소');

    expect(screen.getByText(/취소/)).toBeInTheDocument();
    expect(screen.getByText(/취소/)).toHaveStyleRule('color', '#00000099');
  });

  context('확인 버튼을 누를 때', () => {
    it('onOk가 있을 때 onOk를 실행한다.', () => {
      renderPopupButtons('취소', onMockOk);

      screen.getByText(/확인/).click();
      expect(onMockOk).toHaveBeenCalled();
    });

    it('onOk가 없을 때 onClose를 실행을다.', () => {
      renderPopupButtons('취소');

      screen.getByText(/확인/).click();
      expect(onMockClose).toHaveBeenCalled();
    });
  });
});
