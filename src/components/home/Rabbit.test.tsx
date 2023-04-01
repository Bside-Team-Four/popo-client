import { screen } from '@testing-library/react';

import RabbitState from '@/types/RabbitState';
import { renderWithThemeProviders } from '@/utils/testHelper';

import Rabbit from './Rabbit';

describe('Rabbit', () => {
  const rabbitRender = (rabbitState: RabbitState) => renderWithThemeProviders(
    <Rabbit rabbitState={rabbitState} />,
  );

  context('when rabbitState is sleep', () => {
    it('render sleep rabbit image', () => {
      rabbitRender('sleep');

      expect(screen.getByAltText('sleep-rabbit-image')).toHaveAttribute('src', '/images/rabbit-sleep.svg');
    });
  });
  context('when rabbitState is done', () => {
    it('render done rabbit image', () => {
      rabbitRender('done');

      expect(screen.getByAltText('done-rabbit-image')).toHaveAttribute('src', '/images/rabbit-done.svg');
    });
  });
  context('when rabbitState is start', () => {
    it('render start rabbit image', () => {
      rabbitRender('start');

      expect(screen.getByAltText('start-rabbit-image')).toHaveAttribute('src', '/images/rabbit-start.svg');
    });
  });
});
