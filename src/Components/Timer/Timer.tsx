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
            setIsActive((prevIsActive) => !prevIsActive);
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    return (
        <>
            <Typography variant={"h2"}>
                <span className="digits">
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                </span>
                <span className="digits mili-sec">
                    {("0" + ((time / 10) % 100)).slice(-2)}
                </span>
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