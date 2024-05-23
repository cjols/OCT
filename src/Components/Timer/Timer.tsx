import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Timer.css";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

export type TimerProps = {
    
}

const Timer = (props: TimerProps) => {
    const [time, setTime] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isHolding, setIsHolding] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime((time) => time + 10);
            }, 10)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isActive])

    const handleStartStop = useCallback(() => {
        setIsActive((isActive) => !isActive)
    }, []);

    const handleReset = () => {
        setIsActive(false)
        setTime(0)
    }

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Space' && !isHolding) {
            setIsHolding(true)
            holdTimerRef.current = setTimeout(() => {
                holdTimerRef.current = null
            }, 1000)
        }
    }, [isHolding])

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Space' && isHolding) {
            setIsHolding(false)
            if (holdTimerRef.current === null) {
                handleStartStop()
            } else {
                clearTimeout(holdTimerRef.current!)
                holdTimerRef.current = null
            }
        }
    }, [isHolding, handleStartStop])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    // useEffect(() => {
    //     const handleKeyPress = (event: KeyboardEvent) => {
    //       if (event.code === 'Space') {
    //         handleStartStop()
    //       }
    //     };
    
    //     window.addEventListener('keydown', handleKeyPress);
    
    //     return () => {
    //       window.removeEventListener('keydown', handleKeyPress);
    //     };
    //   }, []);

      const formatTime = (time: number): string => {
        const minutes = Math.floor((time / 60000) % 60)
        const seconds = Math.floor((time / 1000) % 60)
        const mSeconds = Math.floor((time / 10) % 100)

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(mSeconds).padStart(2, '0')}`
      }

    return (
        <>
            <Typography variant={"h1"}>
                <p className="timer">
                    {formatTime(time)}
                </p>
            </Typography>
            <div className="buttons">
                <Button variant={"contained"} onClick={handleStartStop}>
                    {isActive ? "Stop" : "Start"}
                </Button>
                <Button variant={"contained"} onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </>
    );
};

export default Timer;