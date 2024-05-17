import cn from '@lib/classnames';
import { Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RESTING_TIME_KEY } from '@components/Header';
import countdown from '@assets/countdown.mp3';

const ONE_SECOND = 1000;
const AUDIO_VOLUME = 0.5;

export default function Countdown({ onEnd }: { onEnd: () => void }) {
  const [timer, setTimer] = useState<number>();
  const intervalId = useRef<NodeJS.Timeout>();
  const restingTime = parseInt(localStorage.getItem(RESTING_TIME_KEY) || '0');
  const isMounted = useRef(import.meta.env.PROD);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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

      !isSafari && countdownAudio?.play();
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
    <Typography
      variant="h5"
      className={cn('absolute right-1/2 top-16 font-extrabold text-white')}
    >
      {timer}
    </Typography>
  );
}
