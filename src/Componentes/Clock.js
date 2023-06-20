import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    };

    const padZero = (number) => {
        return number.toString().padStart(2, '0');
    };

    return (
        <div>
            <h2 className="h3">Porfavor espere...</h2>
            <p className="h3">{formatTime(time)}</p>
        </div>
    );
};

export default Clock;
