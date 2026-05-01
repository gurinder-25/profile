
import React, { useState } from 'react';
import { WorkItem } from './components/WorkItem';
import { WritingItem } from './components/WritingItem';
import { TABS, WORK_HISTORY, WRITINGS, PROFILE } from './constants/data';
import type { Tab } from './constants/data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  return (
    <div className="page-wrapper">
      <main
        className="page-main"
        style={{ marginTop: activeTab ? '2.5rem' : '38vh' }}
      >
        <header className="page-header">
          <h1 className="profile-name">{PROFILE.NAME}</h1>
          <p className="profile-role">{PROFILE.ROLE}</p>
          <p className="profile-location">{PROFILE.LOCATION}</p>

          <nav className="social-links">
            <a href={PROFILE.EMAIL} className="social-link">email</a>
            <a href={PROFILE.GITHUB} target="_blank" rel="noopener noreferrer" className="social-link">github</a>
            <a href={PROFILE.LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-link">linkedin</a>
          </nav>

          <nav className="tab-bar">
            {Object.values(TABS).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`tab-btn ${activeTab === tab ? 'tab-btn-active' : 'tab-btn-inactive'}`}
              >
                {tab.toLowerCase()}
              </button>
            ))}
          </nav>
        </header>

        {activeTab && (
          <div key={activeTab} className="tab-content">
            {activeTab === TABS.ABOUT && (
              <p className="about-description">{PROFILE.DESCRIPTION}</p>
            )}

            {activeTab === TABS.WORK && (
              <div className="work-list">
                {WORK_HISTORY.map((job, index) => (
                  <WorkItem key={index} role={job.role} company={job.company} duration={job.duration} />
                ))}
              </div>
            )}

            {activeTab === TABS.WRITING && (
              <div className="writing-list">
                {WRITINGS.map((post, index) => (
                  <WritingItem key={index} title={post.title} url={post.url} date={post.date} />
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
