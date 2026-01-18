
import React from 'react';
import { WorkExperience } from '../types';

export const WorkItem: React.FC<WorkExperience> = ({ role, company, duration }) => {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="font-medium text-black">{role}</h3>
        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{duration}</span>
      </div>
      <p className="text-gray-600 text-sm">{company}</p>
    </div>
  );
};
