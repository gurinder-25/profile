
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
      {children}
    </section>
  );
};
