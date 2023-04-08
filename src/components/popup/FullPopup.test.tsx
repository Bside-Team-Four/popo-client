import MockProvider from '@/test/MockProvider';
import { renderWithPortal } from '@/utils/testHelper';

import FullPopup from './FullPopup';

describe('FullPopup', () => {
  const childText = 'PoPo';
  const renderFullPopup = () => renderWithPortal((
    <MockProvider>
      <FullPopup>
        <div>{childText}</div>
      </FullPopup>
    </MockProvider>
  ));

  it('자식 컴포넌트가 나타나야만 한다', () => {
    const { container } = renderFullPopup();

    expect(container).toHaveTextContent(childText);
  });
});
