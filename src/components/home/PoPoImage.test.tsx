import { screen } from '@testing-library/react';

import PoPoImage from '@/components/home/PoPoImage';
import usePoPoState from '@/hooks/recoil/usePoPoState';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('@/hooks/recoil/usePoPoState');

describe('PoPoImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePoPoState as jest.Mock).mockImplementation(() => ({
      popoState: given.popoState,
    }));
  });
  const popoImageRender = () => renderWithProviders(
    <PoPoImage />,
  );

  context('when popo state is sleep', () => {
    given('popoState', () => 'sleep');
    it('render popo sleep image', () => {
      popoImageRender();
      expect(screen.getByAltText('popo-sleep-image')).toHaveAttribute('src', '/images/popo-sleep.svg');
    });
  });

  context('when popo state is done', () => {
    given('popoState', () => 'done');
    it('render popo done image', () => {
      popoImageRender();
      expect(screen.getByAltText('popo-done-image')).toHaveAttribute('src', '/images/popo-done.svg');
    });
  });

  context('when popo state is start', () => {
    given('popoState', () => 'start');
    it('render popo start image', () => {
      popoImageRender();
      expect(screen.getByAltText('popo-start-image')).toHaveAttribute('src', '/images/popo-start.svg');
    });
  });
});
