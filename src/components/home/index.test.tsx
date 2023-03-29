import { render, screen } from '@testing-library/react';

import MockTheme from '@/test/MockTheme';
import RabbitState from '@/types/RabbitState';

import Home from './index';

describe('Home', () => {
  const renderHome = (currentRabbitState: RabbitState) => render(
    <MockTheme>
      <Home currentRabbitState={currentRabbitState} />
    </MockTheme>,
  );

  context('currentRabbitState가 start일 때', () => {
    it('Timer icon을 출력한다.', () => {
      renderHome('start');

      expect(screen.getByAltText('timer icon')).toBeInTheDocument();
    });
  });

  context('currentRabbitState가 start가 아닐 때', () => {
    it('Empty div를 출력한다.', () => {
      renderHome('done');

      expect(screen.getByTestId('empty div')).toBeInTheDocument();
    });
  });
});
