import { useState } from 'react';

import dayjs from 'dayjs';
import _ from 'lodash/fp';
import { useInterval } from 'usehooks-ts';

import RabbitState from '@/types/RabbitState';

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

const getTimerText = () => {
  const { hour, minute, second } = getNowTime();

  if (hour >= 3 && hour < 7) {
    const remainSecond = (3600 * 7) - (hour * 3600 + minute * 60 + second);

    return {
      hourText: padInt(2)(Math.floor(remainSecond / 3600)),
      minuteText: padInt(2)(Math.floor((remainSecond % 3600) / 60)),
      secondText: padInt(2)(remainSecond % 60),
    };
  }

  const remainSecond = 3600 - (minute * 60 + second);
  return {
    hourText: '00',
    minuteText: padInt(2)(Math.floor(remainSecond / 60)),
    secondText: padInt(2)(remainSecond % 60),
  };
};

const getTimerMessage = (rabbitState: RabbitState) => {
  const { hour } = getNowTime();
  const { minuteText } = getTimerText();

  if (rabbitState === 'sleep') {
    return '내일 아침 7시에 다시 POPO가 시작돼';
  }
  if (rabbitState === 'done') {
    const nextHour = hour + 1;
    const ampm = nextHour < 12 ? '오전' : '오후';
    const displayHour = ampm === '오전' ? nextHour : nextHour - 12;

    return (hour + 1) !== 3 ? `이따 ${ampm} ${displayHour}시에 만나자` : '내일 아침 7시에 다시 POPO가 시작돼';
  }
  return `남은 시간 ${minuteText}분이야`;
};

const useTimerText = (
  rabbitState: RabbitState,
  setRabbitState: (rabbitState: RabbitState) => void,
) => {
  const [timerText, setTimerText] = useState(getTimerText());
  const [timerMessage, setTimerMessage] = useState(getTimerMessage(rabbitState));

  useInterval(() => {
    const { hour, minute, second } = getNowTime();

    setTimerText(getTimerText());
    setTimerMessage(getTimerMessage(rabbitState));

    if (hour === 3 && minute + second === 0) {
      setRabbitState('sleep');
    }

    if (!(hour >= 3 && hour < 7) && (minute + second === 0)) {
      setRabbitState('start');
    }
  }, 1000);

  return { timerText, timerMessage };
};

export default useTimerText;
