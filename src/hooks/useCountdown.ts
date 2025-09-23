import { useCallback, useEffect, useRef } from 'react';

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