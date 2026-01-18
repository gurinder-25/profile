
import React from 'react';
import { Section } from './components/Section';
import { WorkItem } from './components/WorkItem';
import { WritingItem } from './components/WritingItem';
import { WorkExperience, Writing } from './types';

const App: React.FC = () => {
  const workHistory: WorkExperience[] = [
    {
      role: 'Software Engineer',
      company: 'Finfactor',
      duration: 'May, 2025 - Present'
    },
    {
      role: 'Software Engineer Trainee',
      company: 'Finfactor',
      duration: 'Feb, 2025 - April, 2025'
    }
  ];

  const writings: Writing[] = [
    {
      title: 'How Data-Driven Decisions Helped Me Avoid Over-Engineering',
      url: 'https://blog.gurinder.dev/article/1'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-24 animate-in fade-in duration-700">        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-2xl font-bold mb-1 text-black">Gurinder Singh</h1>
          <p className="text-gray-600 mb-1">Software Engineer</p>
          <p className="text-gray-500 text-sm mb-4">Pune, Maharashtra, India</p>

          <nav className="flex gap-4 text-sm">
            <a 
              href="mailto:gurinder12723@gmail.com" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              email
            </a>
            <a 
              href="https://github.com/gurinder-25" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              github
            </a>
            <a 
              href="https://www.linkedin.com/in/gurinder-singh-399610226" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              linkedin
            </a>
          </nav>
        </header>

        {/* About Section */}
        <Section title="About">
          <p className="text-gray-700 leading-relaxed max-w-xl">
            Software Engineer with 1 year experience building scalable web services.
            Mostly worked with Java, React and Typescript.
          </p>
        </Section>

        {/* Work Section */}
        <Section title="Work">
          <div className="flex flex-col gap-2">
            {workHistory.map((job, index) => (
              <WorkItem 
                key={index}
                role={job.role}
                company={job.company}
                duration={job.duration}
              />
            ))}
          </div>
        </Section>

        {/* Writing Section */}
        <Section title="Writing">
          <div className="flex flex-col gap-1">
            {writings.map((post, index) => (
              <WritingItem 
                key={index}
                title={post.title}
                url={post.url}
              />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};

export default App;
