import MockTheme from '@/test/MockTheme';
import { renderWithPortal } from '@/utils/testHelper';

import FullPopup from './FullPopup';

describe('FullPopup', () => {
  const childText = 'PoPo';
  const renderFullPopup = () => renderWithPortal((
    <MockTheme>
      <FullPopup visible={given.visible}>
        <div>{childText}</div>
      </FullPopup>
    </MockTheme>
  ));

  context('visible이 false인 경우', () => {
    given('visible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderFullPopup();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('visible이 true인 경우', () => {
    given('visible', () => true);

    it('자식 컴포넌트가 나타나야만 한다', () => {
      const { container } = renderFullPopup();

      expect(container).toHaveTextContent(childText);
    });
  });
});
