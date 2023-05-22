import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import usePollStatus from './recoil/usePollStatus';
import usePOPOText from './usePOPOText';

jest.mock('./recoil/usePollStatus');
jest.useFakeTimers();

describe('usePOPOText', () => {
  const setState = jest.fn();

  beforeEach(() => {
    jest.clearAllTimers();
    (usePollStatus as jest.Mock).mockImplementation(() => ({
      pollStatus: given.pollStatus,
      setPollStatus: setState,
    }));
  });

  const renderPOPOTextHook = (dateValue: string) => {
    jest.setSystemTime(new Date(dateValue));
    return renderHook(
      () => usePOPOText(),
      {
        wrapper: ({ children }) => (
          <RecoilRoot>
            {children}
          </RecoilRoot>
        ),
      },
    );
  };

  context('when pollStatus is sleep', () => {
    given('pollStatus', () => 'SLEEP');

    it('returns sleep titleText, timer', () => {
      const { result } = renderPOPOTextHook('December 17, 2023 03:33:30');

      expect(result.current.titleText).toEqual('POPO');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '00',
        secondText: '00',
      });
    });
  });

  context('when pollStatus is done', () => {
    given('pollStatus', () => 'DONE');

    it('returns done titleText, timer', () => {
      const { result } = renderPOPOTextHook('December 17, 2023 21:33:10');

      expect(result.current.titleText).toEqual('POPO');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '50',
      });
    });
  });

  context('when pollStatus is start', () => {
    given('pollStatus', () => 'START');

    it('returns 오전 start titleText, timer', () => {
      const { result } = renderPOPOTextHook('December 17, 2023 08:33:30');

      expect(result.current.titleText).toEqual('POPO_오전 8시');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });

    it('returns 오후 start titleText, timer', () => {
      const { result } = renderPOPOTextHook('December 17, 2023 20:33:30');

      expect(result.current.titleText).toEqual('POPO_오후 8시');
      expect(result.current.timer).toEqual({
        hourText: '00',
        minuteText: '26',
        secondText: '30',
      });
    });
  });

  it('시간이 sleep 시간일 때 sleep 상태로 변한다.(오전 3시 ~ 오전 7시)', () => {
    given('pollStatus', () => 'START');
    renderPOPOTextHook('December 17, 2023 02:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setState).toHaveBeenCalledWith('SLEEP');
  });

  it('시간이 start 시간일 때 start 상태로 변한다.(오전 7시 ~ 오전 3시)', () => {
    given('pollStatus', () => 'SLEEP');
    renderPOPOTextHook('December 17, 2023 06:59:59');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setState).toHaveBeenCalledWith('START');
  });
});
