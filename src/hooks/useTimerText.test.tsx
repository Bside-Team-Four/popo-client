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

  const renderTimerTextHook = (state: RabbitState, dateValue : string) => {
    jest.setSystemTime(new Date(dateValue));
    return renderHook(
      () => useTimerText(state, setRabbitState),
    );
  };

  context('when rabbitState is start', () => {
    it('returns start timerText', () => {
      const { result } = renderTimerTextHook('start', 'December 17, 2023 08:33:30');

      expect(result.current.timerText).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns start timerMessage', () => {
      const { result } = renderTimerTextHook('start', 'December 17, 2023 08:33:30');

      expect(result.current.timerMessage).toEqual('남은 시간 26분이야');
    });
  });

  context('when rabbitState is done', () => {
    it('returns done timerText', () => {
      const { result } = renderTimerTextHook('done', 'December 17, 2023 09:33:30');

      expect(result.current.timerText).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns done am timerMessage', () => {
      const { result } = renderTimerTextHook('done', 'December 17, 2023 09:33:30');

      expect(result.current.timerMessage).toEqual('이따 오전 10시에 만나자');
    });

    it('returns done pm timerMessage', () => {
      const { result } = renderTimerTextHook('done', 'December 17, 2023 21:33:00');

      expect(result.current.timerMessage).toEqual('이따 오후 10시에 만나자');
    });

    it('returns done timerMessage(마지막 시간일 때 2시대 투표를 끝냈을 때)', () => {
      const { result } = renderTimerTextHook('done', 'December 17, 2023 02:33:00');

      expect(result.current.timerMessage).toEqual('내일 아침 7시에 다시 POPO가 시작돼');
    });
  });

  context('when rabbitState is sleep', () => {
    it('returns sleep timerText', () => {
      const { result } = renderTimerTextHook('sleep', 'December 17, 2023 03:33:00');

      expect(result.current.timerText).toEqual({
        hourText: '03',
        minuteText: '27',
        secondText: '00',
      });
    });

    it('returns sleep timerMessage', () => {
      const { result } = renderTimerTextHook('sleep', 'December 17, 2023 03:33:00');

      expect(result.current.timerMessage).toEqual('내일 아침 7시에 다시 POPO가 시작돼');
    });
  });

  it('updates rabbit state correctly when it is time to sleep', () => {
    renderTimerTextHook('start', 'December 17, 2023 02:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setRabbitState).toHaveBeenCalled();
    expect(setRabbitState).toHaveBeenCalledWith('sleep');
  });

  it('updates rabbit state correctly when it is time to wake up', () => {
    renderTimerTextHook('sleep', 'December 17, 2023 06:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setRabbitState).toHaveBeenCalled();
    expect(setRabbitState).toHaveBeenCalledWith('start');
  });
});
