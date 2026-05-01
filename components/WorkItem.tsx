
import React from 'react';
import { WorkExperience } from '../types';

export const WorkItem: React.FC<WorkExperience> = ({ role, company, duration }) => {
  return (
    <div className="work-item">
      <div className="work-item-header">
        <h3 className="work-item-role">{role}</h3>
        <span className="work-item-duration">{duration}</span>
      </div>
      <p className="work-item-company">{company}</p>
    </div>
  );
};
