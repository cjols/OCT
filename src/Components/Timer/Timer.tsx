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

    const handleStart = () => {
        setTime(Date.now())
        setIsActive(true)
    }

    const handleStop = () => {
        setStopTime(Date.now())
    }

    const handleReset = () => {
        setIsActive(false)
        setTime(0)
        setStopTime(0)
    }

    return (
        <>
            <Typography variant={"h2"}>
                {/* Start Time:
                {startTime}
                Stop Time:
                {stopTime} */}
            </Typography>
            <Button variant={"contained"} onClick={handleStart}>
                Start
            </Button>
            <Button variant={"contained"} onClick={handleReset}>
                Reset
            </Button>
        </>
    );
};

export default Timer;