import { useState } from 'react';

import dayjs from 'dayjs';
import _ from 'lodash/fp';
import { useInterval } from 'usehooks-ts';

import usePoPoState from '@/hooks/recoil/usePoPoState';
import PoPoState from '@/types/PoPoState';

const padInt = (length: number): ((a1: number) => string) => _.flow(
  String,
  (numberStr) => numberStr.padStart(length, '0'),
);

const getNowTime = () => {
  const now = dayjs();
  return {
    hour: now.get('hour'),
    minute: now.get('minute'),
    second: now.get('second'),
  };
};

const getTimerText = (state: PoPoState) => {
  const { minute, second } = getNowTime();

  if (state === 'sleep') {
    return {
      hourText: '00',
      minuteText: '00',
      secondText: '00',
    };
  }

  const remainSecond = 3600 - (minute * 60 + second);
  return {
    hourText: '00',
    minuteText: padInt(2)(Math.floor(remainSecond / 60)),
    secondText: padInt(2)(remainSecond % 60),
  };
};

const getTitleText = (state:PoPoState) => {
  const { hour } = getNowTime();

  if (state === 'start') {
    const timeText = hour <= 12 ? `오전 ${hour}시` : `오후 ${hour - 12}시`;

    return `POPO_${timeText}`;
  }

  return 'POPO';
};

const usePoPoText = () => {
  const { popoState, setPoPoState } = usePoPoState();

  const [titleText, setTitleText] = useState(getTitleText(popoState));
  const [timer, setTimer] = useState(getTimerText(popoState));

  useInterval(() => {
    const { hour, minute, second } = getNowTime();

    setTitleText(getTitleText(popoState));
    setTimer(getTimerText(popoState));

    if (hour === 3 && minute + second === 0) {
      setPoPoState('sleep');
    }

    if (!(hour >= 3 && hour < 7) && (minute + second === 0)) {
      setPoPoState('start');
    }
  }, 1000);

  return {
    titleText,
    timer,
  };
};

export default usePoPoText;
