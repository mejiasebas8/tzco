import { useState, useEffect } from 'react';

export function useClock(): string {
    const [time, setTime] = useState<string>(formatTime(new Date()));
    
    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            updateClock();
        }, 1000);
        
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    function updateClock() {
        const now = new Date();
        setTime(formatTime(now));
    }
    
    function formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    
    return time;
}