
import React from 'react';

interface StatsCardProps {
  value: string;
  label: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label, color }) => {
  return (
    <div className={`stats-card bg-pet-${color}`}>
      <div className="text-white text-2xl font-bold">{value}</div>
      <div className="text-white text-sm opacity-80">{label}</div>
    </div>
  );
};

export default StatsCard;
