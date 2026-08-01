import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, duration = 2000, suffix = '', prefix = '', decimals = 0, start = 0 }) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const numericTarget = typeof target === 'number' ? target : parseFloat(target);
    if (isNaN(numericTarget)) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quadratic ease-out formula for smooth count animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + easeProgress * (numericTarget - start);
      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isVisible, target, duration, start]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-extrabold tracking-tight inline-block transition-transform transform hover:scale-105">
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default AnimatedCounter;

