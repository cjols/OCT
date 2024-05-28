import React from 'react'
import "./Record.css"

interface RecordProps {
    recordedTimes: number[]
}

const Record: React.FC<RecordProps> = ({ recordedTimes }) => {
    return (
        <div>
            <h2>Recorded Times:</h2>
            <ol>
                {recordedTimes.map((recordedTime, index) => (
                    <li key={index}>{recordedTime}</li>
                ))}
            </ol>
        </div>
    )
}

export default Record