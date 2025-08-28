import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle id="p1" cx="10%" cy="10%" r="80" fill="#8B5CF6" />
          <circle id="p2" cx="60%" cy="40%" r="120" fill="#3B82F6" />
          <circle id="p3" cx="80%" cy="60%" r="100" fill="#10B981" />
          <circle id="p4" cx="30%" cy="70%" r="70" fill="#F59E0B" />
          <circle id="p5" cx="70%" cy="90%" r="90" fill="#EF4444" />

          <animateMotion href="#p1" dur="20s" repeatCount="indefinite" path="M0,0 Q100,50 200,0 T400,0" />
          <animateMotion href="#p2" dur="25s" repeatCount="indefinite" path="M0,0 Q200,100 400,0 T800,0" />
          <animateMotion href="#p3" dur="30s" repeatCount="indefinite" path="M0,0 Q300,150 600,0 T1200,0" />
          <animateMotion href="#p4" dur="35s" repeatCount="indefinite" path="M0,0 Q400,200 800,0 T1600,0" />
          <animateMotion href="#p5" dur="40s" repeatCount="indefinite" path="M0,0 Q500,250 1000,0 T2000,0" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
