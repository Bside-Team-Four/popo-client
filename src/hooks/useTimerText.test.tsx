import { act, renderHook } from '@testing-library/react';

import useTimerText from '@/hooks/useTimerText';
import RabbitState from '@/types/RabbitState';

jest.useFakeTimers();
describe('useTimerText', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const setRabbitState = jest.fn();

  const renderTimerTextHook = (state: RabbitState) => renderHook(
    () => useTimerText(state, setRabbitState),
  );

  context('when rabbitState is start', () => {
    it('returns start timerText', () => {
      jest.setSystemTime(new Date('December 17, 2023 08:33:30'));
      const { result } = renderTimerTextHook('start');

      expect(result.current.timerText).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns start timerMessage', () => {
      jest.setSystemTime(new Date('December 17, 2023 08:33:30'));
      const { result } = renderTimerTextHook('start');

      expect(result.current.timerMessage).toEqual('남은 시간 26분이야');
    });
  });

  context('when rabbitState is done', () => {
    it('returns done timerText', () => {
      jest.setSystemTime(new Date('December 17, 2023 09:33:30'));
      const { result } = renderTimerTextHook('done');

      expect(result.current.timerText).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns done timerMessage', () => {
      jest.setSystemTime(new Date('December 17, 2023 09:33:00'));
      const { result } = renderTimerTextHook('done');

      expect(result.current.timerMessage).toEqual('이따 오전 10시에 만나자');
    });

    it('returns done timerMessage(마지막 시간일 때 2시대 투표를 끝냈을 때)', () => {
      jest.setSystemTime(new Date('December 17, 2023 02:33:00'));
      const { result } = renderTimerTextHook('done');

      expect(result.current.timerMessage).toEqual('내일 아침 7시에 다시 POPO가 시작돼');
    });
  });

  context('when rabbitState is sleep', () => {
    it('returns sleep timerText', () => {
      jest.setSystemTime(new Date('December 17, 2023 03:33:00'));
      const { result } = renderTimerTextHook('sleep');

      expect(result.current.timerText).toEqual({
        hourText: '03',
        minuteText: '27',
        secondText: '00',
      });
    });

    it('returns sleep timerMessage', () => {
      jest.setSystemTime(new Date('December 17, 2023 03:33:00'));
      const { result } = renderTimerTextHook('sleep');

      expect(result.current.timerMessage).toEqual('내일 아침 7시에 다시 POPO가 시작돼');
    });
  });

  it('updates rabbit state correctly when it is time to sleep', () => {
    jest.setSystemTime(new Date('December 17, 2023 02:59:59'));
    renderTimerTextHook('start');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setRabbitState).toHaveBeenCalledTimes(1);
    expect(setRabbitState).toHaveBeenCalledWith('sleep');
  });

  it('updates rabbit state correctly when it is time to wake up', () => {
    jest.setSystemTime(new Date('December 17, 2023 06:59:59'));
    renderTimerTextHook('sleep');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setRabbitState).toHaveBeenCalledTimes(1);
    expect(setRabbitState).toHaveBeenCalledWith('start');
  });
});
