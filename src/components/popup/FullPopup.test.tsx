import MockProvider from '@/test/MockProvider';
import { renderWithPortal } from '@/utils/testHelper';

import FullPopup from './FullPopup';

describe('FullPopup', () => {
  const childText = 'POPO';
  const renderFullPopup = () => renderWithPortal(
    (
      <MockProvider>
        <FullPopup show>
          <div>{childText}</div>
        </FullPopup>
      </MockProvider>
    ), 'full-portal-root',
  );

  it('자식 컴포넌트가 나타나야만 한다', () => {
    const { container } = renderFullPopup();

    expect(container).toHaveTextContent(childText);
  });
});
