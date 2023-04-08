import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import usePoPoState from '@/hooks/recoil/usePoPoState';
import usePoPoText from '@/hooks/usePoPoText';

jest.mock('@/hooks/recoil/usePoPoState');

jest.useFakeTimers();

describe('usePoPoText', () => {
  const setState = jest.fn();

  beforeEach(() => {
    jest.clearAllTimers();
    (usePoPoState as jest.Mock).mockImplementation(() => ({
      popoState: given.popoState,
      setPoPoState: setState,
    }));
  });

  const renderPoPoTextHook = (dateValue: string) => {
    jest.setSystemTime(new Date(dateValue));
    return renderHook(
      () => usePoPoText(),
      {
        wrapper: ({ children }) => (
          <RecoilRoot>
            {children}
          </RecoilRoot>
        ),
      },
    );
  };

  context('when popo state is sleep', () => {
    given('popoState', () => 'sleep');

    it('returns sleep titleText, timer', () => {
      const { result } = renderPoPoTextHook('December 17, 2023 03:33:30');

      expect(result.current.titleText).toEqual('POPO');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '00',
        secondText: '00',
      });
    });
  });

  context('when popo state is done', () => {
    given('popoState', () => 'done');

    it('returns done titleText, timer', () => {
      const { result } = renderPoPoTextHook('December 17, 2023 21:33:10');

      expect(result.current.titleText).toEqual('POPO');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '50',
      });
    });
  });

  context('when popo state is start', () => {
    given('popoState', () => 'start');

    it('returns 오전 start titleText, timer', () => {
      const { result } = renderPoPoTextHook('December 17, 2023 08:33:30');

      expect(result.current.titleText).toEqual('POPO_오전 8시');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns 오후 start titleText, timer', () => {
      const { result } = renderPoPoTextHook('December 17, 2023 20:33:30');

      expect(result.current.titleText).toEqual('POPO_오후 8시');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });
  });

  it('시간이 sleep 시간일 때 sleep 상태로 변한다.(오전 3시 ~ 오전 7시)', () => {
    given('popoState', () => 'start');
    renderPoPoTextHook('December 17, 2023 02:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith('sleep');
  });

  it('시간이 start 시간일 때 start 상태로 변한다.(오전 7시 ~ 오전 3시)', () => {
    given('popoState', () => 'sleep');
    renderPoPoTextHook('December 17, 2023 06:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith('start');
  });
});
