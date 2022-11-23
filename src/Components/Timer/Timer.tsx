import React, { useState } from "react";
import "./Timer.css";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

export type TimerProps = {
    
}

const Timer = (props: TimerProps) => {
    const [startTime, setStartTime] = useState(0);
    const [stopTime, setStopTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    const text = "hello";
    let start;

    const handleStart = () => {
        setStartTime(Date.now())
    }

    const handleStop = () => {
        setStopTime(Date.now())
    }

    return (
        <>
            <Typography variant={"h2"}>
                Start Time:
                {startTime}
                Stop Time:
                {stopTime}
            </Typography>
            <Button variant={"contained"} onClick={handleStart}>
                Start
            </Button>
            <Button variant={"contained"} onClick={handleStop}>
                Stop
            </Button>
        </>
    );
};

export default Timer;