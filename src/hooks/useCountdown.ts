import { useCallback, useEffect, useRef, useState } from 'react';

const COUNTDOWN_EVENT = 'countdown-update';

export const useCountdown = (initialTime: number = 0) => {
    const countdownRef = useRef<number>(initialTime);
    const startTimeRef = useRef<number>(0);
    const remainingTimeRef = useRef<number>(initialTime);
    const animationFrameRef = useRef<number>(0);

    const startCountdown = useCallback((time: number) => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        
        startTimeRef.current = Date.now();
        remainingTimeRef.current = time;
        countdownRef.current = time;
        
        const updateCountdown = () => {
            const currentTime = Date.now();
            const elapsedTime = Math.floor((currentTime - (startTimeRef.current || currentTime)) / 1000);
            const newCountdown = Math.max(0, remainingTimeRef.current - elapsedTime);

            if (newCountdown !== countdownRef.current) {
                countdownRef.current = newCountdown;
                window.dispatchEvent(new CustomEvent(COUNTDOWN_EVENT, { 
                    detail: { countdown: newCountdown }
                }));
            }

            if (newCountdown > 0) {
                animationFrameRef.current = requestAnimationFrame(updateCountdown);
            }
        };

        animationFrameRef.current = requestAnimationFrame(updateCountdown);
    }, []);

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return {
        getCountdown: () => countdownRef.current,
        startCountdown,
        isCounting: () => countdownRef.current > 0
    };
}; 


export function useCountdownVer2() {
  const [countdown, setCountdown] = useState(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(seconds);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const isCounting = () => countdown > 0;

  return {
    countdown,
    startCountdown,
    isCounting,
  };
}