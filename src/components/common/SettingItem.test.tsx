import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SettingItem from './SettingItem';

describe('SettingItem', () => {
  const onClick = jest.fn();

  const renderSettingItem = () => renderWithProviders(
    <SettingItem
      title="타이틀"
      onClick={onClick}
      showArrow={given.showArrow}
      message={given.message}
    />,
  );

  context('이동하는 페이지일 경우(showArrow: true)', () => {
    given('showArrow', () => true);

    it('타이틀과 화살표 아이콘이 보여야 한다.', () => {
      renderSettingItem();

      expect(screen.getByText('타이틀')).toBeInTheDocument();
      expect(screen.getByAltText('arrow icon')).toBeInTheDocument();
    });
  });

  context('메세지가 있을 경우(message: "메세지")', () => {
    given('message', () => '메세지');

    it('타이틀과 메세지가 보여야 한다.', () => {
      renderSettingItem();

      expect(screen.getByText('타이틀')).toBeInTheDocument();
      expect(screen.getByText('메세지')).toBeInTheDocument();
    });
  });

  it('아이템을 클릭하면 onClick 함수가 실행된다.', () => {
    renderSettingItem();

    screen.getByText('타이틀').click();

    expect(onClick).toHaveBeenCalled();
  });
});
