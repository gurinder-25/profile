
import React, { useState } from 'react';
import { WorkItem } from './components/WorkItem';
import { WritingItem } from './components/WritingItem';
import { WorkExperience, Writing } from './types';

const TABS = ['About', 'Work', 'Writing'] as const;
type Tab = typeof TABS[number];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

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
      url: 'https://blog.gurinder.dev/article/1',
      date: '  January, 2026'
    }
  ];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  return (
    <div className="min-h-screen bg-white">
      <main
        className="max-w-2xl mx-auto px-6 pb-12 transition-all duration-500 ease-in-out"
        style={{ marginTop: activeTab ? '2.5rem' : '38vh' }}
      >
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-black">Gurinder Singh</h1>
          <p className="text-gray-600 mb-1">Software Engineer</p>
          <p className="text-gray-500 text-sm mb-4">Pune, Maharashtra, India</p>

          <nav className="flex gap-4 text-sm mb-6">
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

          {/* Tab bar */}
          <nav className="flex gap-7">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`pb-1 transition-all duration-200 cursor-pointer bg-transparent border-0 outline-none text-[0.9375rem] ${
                  activeTab === tab
                    ? 'text-black font-medium border-b border-black'
                    : 'text-gray-400 hover:text-gray-600 underline decoration-dotted decoration-gray-300 underline-offset-4 hover:decoration-gray-400'
                }`}
              >
                {tab.toLowerCase()}
              </button>
            ))}
          </nav>
        </header>

        {/* Tab content */}
        {activeTab && (
          <div key={activeTab} className="tab-content">
            {activeTab === 'About' && (
              <p className="text-gray-700 leading-relaxed max-w-xl">
                Software Engineer with 1 year experience building scalable web services.
                Mostly worked with Java, React and Typescript.
              </p>
            )}

            {activeTab === 'Work' && (
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
            )}

            {activeTab === 'Writing' && (
              <div className="flex flex-col gap-1">
                {writings.map((post, index) => (
                  <WritingItem
                    key={index}
                    title={post.title}
                    url={post.url}
                    date={post.date}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
