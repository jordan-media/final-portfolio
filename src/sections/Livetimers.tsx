import React, { useEffect, useState } from 'react';
import FlipUnit from './FlipUnit';

const getDurationParts = (startDate: Date, units: ('y' | 'm' | 'd' | 'h' | 'min' | 's')[]) => {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  const result: Record<string, number> = {
    y: years,
    m: months % 12,
    d: days % 30,
    h: hours % 24,
    min: mins % 60,
    s: seconds % 60,
  };

  return units.map(u => `${result[u]}${u}`).join(' ');
};

const LiveTimers: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const birthDate = new Date('1991-09-16T08:32:00-03:00');
  const devStartDate = new Date('2024-01-01T00:00:00');
  const projectStartDate = new Date('2025-07-01T00:00:00');

  const birthParts = getDurationParts(birthDate, ['y', 'm', 'd', 'h', 'min', 's']).split(' ');
  const devParts = getDurationParts(devStartDate, ['y', 'm', 'd', 'h']).split(' ');
  const projectParts = getDurationParts(projectStartDate, ['d']).split(' ');

  return (
    <div className="p-6 flex flex-col gap-8 items-end">
      {/* 🧠 Age Timer */}
      <div className="flex gap-2">
        {birthParts.map((part, i) => (
          <FlipUnit key={i} value={part.replace(/[a-z]+/, '')} />
        ))}
      </div>

      {/* 💻 Dev Timer */}
      <div className="flex gap-2">
        {devParts.map((part, i) => (
          <FlipUnit key={i} value={part.replace(/[a-z]+/, '')} />
        ))}
      </div>

      {/* 🌱 Project Timer */}
      <div className="flex gap-2">
        {projectParts.map((part, i) => (
          <FlipUnit key={i} value={part.replace(/[a-z]+/, '')} />
        ))}
      </div>
    </div>
  );
};

export default LiveTimers;
