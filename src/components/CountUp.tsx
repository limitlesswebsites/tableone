
import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  delay = 0
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const countingStarted = useRef(false);

  useEffect(() => {
    if (countingStarted.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          setTimeout(() => {
            countingStarted.current = true;
            const startTime = Date.now();
            const countTo = end;
            
            const timer = setInterval(() => {
              const elapsedTime = Date.now() - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              const currentCount = progress * countTo;
              
              setCount(currentCount);
              
              if (progress === 1) {
                clearInterval(timer);
                hasAnimated.current = true;
              }
            }, 16);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration, delay]);
  
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).replace(/,/g, separator);
  };
  
  return (
    <span ref={countRef} className="inline-block">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default CountUp;
