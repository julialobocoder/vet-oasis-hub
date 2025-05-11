
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  color: 'orange' | 'blue' | 'green' | 'purple';
  index: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, color, index }) => {
  return (
    <div className={`service-card ${color}`}>
      <div className="mb-2 opacity-75">{index}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default ServiceCard;
