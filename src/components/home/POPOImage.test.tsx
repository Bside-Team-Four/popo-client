import { screen } from '@testing-library/react';

import POPOImage from '@/components/home/POPOImage';
import usePollStatus from '@/hooks/recoil/usePollStatus';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('@/hooks/recoil/usePollStatus');

describe('POPOImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePollStatus as jest.Mock).mockImplementation(() => ({
      pollStatus: given.pollStatus,
    }));
  });
  const popoImageRender = () => renderWithProviders(
    <POPOImage />,
  );

  context('when pollStatus is sleep', () => {
    given('pollStatus', () => 'SLEEP');

    it('render popo sleep image', () => {
      popoImageRender();

      expect(screen.getByAltText('popo-sleep-image')).toHaveAttribute('src', '/images/popo-sleep.svg');
    });
  });

  context('when pollStatus is done', () => {
    given('pollStatus', () => 'DONE');

    it('render popo done image', () => {
      popoImageRender();

      expect(screen.getByAltText('popo-done-image')).toHaveAttribute('src', '/images/popo-done.svg');
    });
  });

  context('when pollStatus is start', () => {
    given('pollStatus', () => 'START');

    it('render popo start image', () => {
      popoImageRender();
      expect(screen.getByAltText('popo-start-image')).toHaveAttribute('src', '/images/popo-start.svg');
    });
  });
});
