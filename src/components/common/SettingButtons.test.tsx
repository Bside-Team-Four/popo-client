import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SettingButtons from './SettingButtons';

describe('SettingButtons', () => {
  const onClick = jest.fn();
  const onSkip = jest.fn();

  const renderSettingButtons = () => renderWithProviders(
    <SettingButtons
      isSetting={given.isSetting}
      onClick={onClick}
      onSkip={onSkip}
    />,
  );

  it('확인, 다음에 할래요 버튼을 화면에 보여준다.', () => {
    given('isSetting', () => true);
    renderSettingButtons();

    expect(screen.getByText(/확인/)).toBeInTheDocument();
    expect(screen.getByText(/다음에 할래요/)).toBeInTheDocument();
  });

  it('확인 버튼을 클릭하면 onClick 함수가 실행된다.', () => {
    given('isSetting', () => true);
    renderSettingButtons();

    screen.getByText(/확인/).click();

    expect(onClick).toHaveBeenCalled();
  });

  it('다음에 할래요 버튼을 클릭하면 onSkip 함수가 실행된다.', () => {
    given('isSetting', () => true);
    renderSettingButtons();

    screen.getByText(/다음에 할래요/).click();

    expect(onSkip).toHaveBeenCalled();
  });

  context('프로필 이미지를 설정하지 않았으면(isSetting:false)', () => {
    given('isSetting', () => false);

    it('확인 버튼을 비활성화 시킨다.', () => {
      renderSettingButtons();

      expect(screen.getByText(/확인/)).toBeDisabled();
    });
  });
});
