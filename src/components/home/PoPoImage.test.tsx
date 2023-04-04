import { screen } from '@testing-library/react';

import PoPoImage from '@/components/home/PoPoImage';
import PoPoState from '@/types/PoPoState';
import { renderWithThemeProviders } from '@/utils/testHelper';

describe('PoPoImage', () => {
  const popoImageRender = (state: PoPoState) => renderWithThemeProviders(
    <PoPoImage state={state} />,
  );

  context('when popo state is sleep', () => {
    it('render popo sleep image', () => {
      popoImageRender('sleep');

      expect(screen.getByAltText('popo-sleep-image')).toHaveAttribute('src', '/images/popo-sleep.svg');
    });
  });

  context('when popo state is done', () => {
    it('render popo done image', () => {
      popoImageRender('done');

      expect(screen.getByAltText('popo-done-image')).toHaveAttribute('src', '/images/popo-done.svg');
    });
  });

  context('when popo state is start', () => {
    it('render popo start image', () => {
      popoImageRender('start');

      expect(screen.getByAltText('popo-start-image')).toHaveAttribute('src', '/images/popo-start.svg');
    });
  });
});
