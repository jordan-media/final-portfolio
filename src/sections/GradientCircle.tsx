// src/sections/GradientCircle.tsx
import React from 'react';

interface GradientCircleProps {
  size?: number; // px size
  className?: string;
  style?: React.CSSProperties;
}

const GradientCircle: React.FC<GradientCircleProps> = ({ size = 256, className = '', style = {} }) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden opacity-[0.3] ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(to right, #FFFFFF 0%, #470C86 100%)'
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset -1px 2px 5.5px rgba(255, 255, 255, 0.08)'
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset -9px 1px 13.7px rgba(23, 13, 69, 0.54)'
        }}
      />
      <div
        className="absolute inset-0 rounded-full mix-blend-overlay backdrop-blur-[4.8px] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(199, 223, 164, 0.43), rgba(255, 255, 255, 0.25))'
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%\' height=\'100%\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.1\' numOctaves=\'1\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default GradientCircle;
