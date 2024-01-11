import React, { useEffect, useState } from "react";
import "./Timer.css";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

export type TimerProps = {
    
}

const Timer = (props: TimerProps) => {
    const [time, setTime] = useState(0)
    const [stopTime, setStopTime] = useState(0)
    const [isActive, setIsActive] = useState(false)


    useEffect(() => {
        let interval: any = null

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isActive])

    const handleStartStop = () => {
        setIsActive(!isActive)
    }

    const handleReset = () => {
        setIsActive(false)
        setTime(0)
        setStopTime(0)
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
          if (event.code === 'Space') {
            handleStartStop()
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

      const formatTime = (time: number): string => {
        const minutes = Math.floor((time / 60000) % 60)
        const seconds = Math.floor((time / 1000) % 60)
        const mSeconds = Math.floor((time / 10) % 100)

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(mSeconds).padStart(2, '0')}`
      }

    return (
        <>
            <Typography variant={"h1"}>
                <p>
                    {formatTime(time)}
                </p>
            </Typography>
            <Button variant={"contained"} onClick={handleStartStop}>
                {isActive ? "Stop" : "Start"}
            </Button>
            <Button variant={"contained"} onClick={handleReset}>
                Reset
            </Button>
        </>
    );
};

export default Timer;