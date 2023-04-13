import { useIsMounted } from 'usehooks-ts';

import Portal from '@/components/popup/Portal';
import { renderWithPortal } from '@/utils/testHelper';

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useIsMounted: jest.fn(),
}));

describe('Portal', () => {
  const childText = 'PoPo';

  beforeEach(() => {
    jest.clearAllMocks();

    (useIsMounted as jest.Mock).mockImplementation(() => given.isMounted);
  });

  const renderPortal = () => renderWithPortal((
    <Portal show elementId={given.elementId}>
      <div>{childText}</div>
    </Portal>
  ));

  context('마운트가 되지 않은 경우', () => {
    given('isMounted', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderPortal();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('마운트가 된 경우', () => {
    given('isMounted', () => true);

    context('elementId를 가진 element가 존재하지 않는 경우', () => {
      given('elementId', () => 'test');

      it('아무것도 나타나지 않아야만 한다', () => {
        const { container } = renderPortal();

        expect(container).toBeEmptyDOMElement();
      });
    });

    context('elementId를 가진 element가 존재하는 경우', () => {
      given('elementId', () => 'normal-portal-root');

      it('자식 컴포넌트가 나타나야만 한다', () => {
        const { container } = renderPortal();

        expect(container).toHaveTextContent(childText);
      });
    });
  });
});
