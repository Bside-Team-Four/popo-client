import { screen } from '@testing-library/react';

import RabbitState from '@/types/RabbitState';
import renderWithProviders from '@/utils/testHelper';

import Timer from './Timer';

jest.useFakeTimers();
describe('Timer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  const setRabbitState = jest.fn();
  const renderTimer = (rabbitState: RabbitState) => renderWithProviders(
    <Timer rabbitState={rabbitState} setRabbitState={setRabbitState} />,
  );

  context('when rabbitState is start', () => {
    it('render start message', () => {
      jest.setSystemTime(new Date('December 17, 2023 08:33:00'));

      renderTimer('start');

      expect(screen.getByText('남은 시간 27분이야')).toBeInTheDocument();
    });
  });

  context('when rabbitState is done', () => {
    it('render done message', () => {
      jest.setSystemTime(new Date('December 17, 2023 09:33:00'));

      renderTimer('done');

      expect(screen.getByText('이따 오전 10시에 만나자')).toBeInTheDocument();
    });
  });

  context('when rabbitState is sleep', () => {
    it('render sleep message', () => {
      jest.setSystemTime(new Date('December 17, 2023 03:33:00'));

      renderTimer('sleep');

      expect(screen.getByText('내일 아침 7시에 다시 POPO가 시작돼')).toBeInTheDocument();
    });
  });
});
