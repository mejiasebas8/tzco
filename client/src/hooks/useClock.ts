import { useState, useEffect } from 'react';

export function useClock(): string {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    // Update the clock every second
    function updateClock() {
      const now = new Date();
      // Format to Eastern Time (America/New_York)
      const easternTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      
      const hours = easternTime.getHours().toString().padStart(2, '0');
      const minutes = easternTime.getMinutes().toString().padStart(2, '0');
      const seconds = easternTime.getSeconds().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
    }

    // Call once immediately
    updateClock();
    
    // Set up interval to update clock every second
    const intervalId = setInterval(updateClock, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return time;
}
