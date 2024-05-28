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

    const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(0)
    const elapsedTimeRef = useRef<number>(0)
    const requestRef = useRef<number | null>(null)

    // useEffect(() => {
    //     if (isActive) {
    //         timerRef.current = setInterval(() => {
    //             setTime((time) => time + 10);
    //         }, 10)
    //     } else {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current)
    //             timerRef.current = null
    //         }
    //     }
    //     return () => {
    //         if (timerRef.current) {
    //             clearInterval(timerRef.current)
    //         }
    //     }
    // }, [isActive])

    const startTimer = useCallback(() => {
        startTimeRef.current = performance.now() - elapsedTimeRef.current
        setIsActive(true)
    }, [])

    const stopTimer = useCallback(() => {
        setIsActive(false)
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current)
            requestRef.current = null
        }
    }, [])

    const updateTimer = useCallback(() => {
        elapsedTimeRef.current = performance.now() - startTimeRef.current
        setTime(Math.floor(elapsedTimeRef.current))
        requestRef.current = requestAnimationFrame(updateTimer)
    }, [])

    // const handleStartStop = useCallback(() => {
    //     setIsActive((isActive) => !isActive)
    // }, [isActive]);

    const handleReset = () => {
        setIsActive(false)
        setTime(0)
    }

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Space') {
            if (isActive) {
                stopTimer()
            } else if (!isHolding) {
                setTime(0)
                setIsHolding(true)
                holdTimerRef.current = setTimeout(() => {
                    // startTimer()    // ???
                    holdTimerRef.current = null
                }, 1000)
            }
        }
    }, [isActive, isHolding, stopTimer])

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Space' && isHolding) {
            setIsHolding(false)
            if (holdTimerRef.current) {
                clearTimeout(holdTimerRef.current!)
                holdTimerRef.current = null
            } else {
                startTimer()
            }
        }
    }, [isHolding, startTimer])

    useEffect (() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(updateTimer)
        } else {
            elapsedTimeRef.current = 0
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [isActive, updateTimer])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

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
                <Button variant={"contained"} onClick={startTimer}>
                    {"Start"}
                </Button>
                <Button variant={"contained"} onClick={stopTimer}>
                    {"Stop"}
                </Button>
                <Button variant={"contained"} onClick={handleReset}>
                    Reset
                </Button>
            </div>
        </>
    );
};

export default Timer;