import cn from '@lib/classnames';
import { Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RESTING_TIME_KEY } from '@components/Header';
import countdown from '@assets/countdown.mp3';

const ONE_SECOND = 1000;
const AUDIO_VOLUME = 0.05;

export default function Countdown({ onEnd }: { onEnd: () => void }) {
  const [timer, setTimer] = useState<number>();
  const intervalId = useRef<NodeJS.Timeout>();
  const restingTime = useMemo(() => {
    const time = localStorage.getItem(RESTING_TIME_KEY);
    return parseInt(time || '0');
  }, []);
  const isMounted = useRef(false);
  const countdownAudio = useMemo(() => {
    const audio = new Audio(countdown);
    audio.volume = AUDIO_VOLUME;
    return audio;
  }, []);

  useEffect(() => {
    if (restingTime === 0) return;

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (timer === 0) {
      clearInterval(intervalId.current);

      countdownAudio?.play();
      onEnd();
    }
    if (!timer) {
      setTimer(restingTime);
      intervalId.current = setInterval(() => {
        setTimer((prevState) => prevState && prevState - 1);
      }, ONE_SECOND);
    }
  }, [timer]);

  return (
    <>
      <Typography
        variant="h5"
        className={cn('absolute right-1/2 top-16 font-extrabold text-white')}
      >
        {timer}
      </Typography>
    </>
  );
}
