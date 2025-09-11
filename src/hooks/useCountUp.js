import { useEffect, useState, useRef } from 'react';

export default function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0);     
  const prevTarget = useRef(0);          

  useEffect(() => {
    let startTime;
    const startValue = prevTarget.current;
    const delta = target - startValue;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const current = Math.floor(startValue + delta * progress);
      setValue(current);

      if (progress < 1) requestAnimationFrame(step);
      else prevTarget.current = target; 
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}
