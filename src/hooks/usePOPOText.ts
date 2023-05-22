import { useState } from 'react';

import dayjs from 'dayjs';
import _ from 'lodash/fp';
import { useInterval } from 'usehooks-ts';

import usePollStatus from '@/hooks/recoil/usePollStatus';
import PollStatus from '@/types/PollStatus';

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

const getTimerText = (pollStatus: PollStatus) => {
  const { minute, second } = getNowTime();

  if (pollStatus === 'SLEEP') {
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

const getTitleText = (pollStatus:PollStatus) => {
  const { hour } = getNowTime();

  if (pollStatus === 'START') {
    const timeText = hour <= 12 ? `오전 ${hour}시` : `오후 ${hour - 12}시`;

    return `POPO_${timeText}`;
  }

  return 'POPO';
};

const usePOPOText = () => {
  const { pollStatus, setPollStatus } = usePollStatus();

  const [titleText, setTitleText] = useState(getTitleText(pollStatus));
  const [timer, setTimer] = useState(getTimerText(pollStatus));

  useInterval(() => {
    const { hour, minute, second } = getNowTime();

    setTitleText(getTitleText(pollStatus));
    setTimer(getTimerText(pollStatus));

    if (hour === 3 && minute + second === 0) {
      setPollStatus('SLEEP');
    }

    if (!(hour >= 3 && hour < 7) && (minute + second === 0)) {
      setPollStatus('START');
    }
  }, 1000);

  return {
    titleText,
    timer,
  };
};

export default usePOPOText;
