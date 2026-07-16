import React from 'react';
import { WorkItem } from './components/WorkItem';
import { WritingItem } from './components/WritingItem';
import { WORK_HISTORY, PROFILE } from '../../constants/data';
import { articles } from '../blog/data/articles';

const Profile: React.FC = () => {
  return (
    <div className="page-wrapper">
      <main className="page-main">
        <header className="page-header">
          <h1 className="profile-name">{PROFILE.NAME}</h1>
          <p className="profile-role">{PROFILE.ROLE}</p>
          <p className="profile-location">{PROFILE.LOCATION}</p>

          <nav className="social-links">
            <a href={PROFILE.EMAIL} className="social-link">email</a>
            <a href={PROFILE.GITHUB} target="_blank" rel="noopener noreferrer" className="social-link">github</a>
            <a href={PROFILE.LINKEDIN} target="_blank" rel="noopener noreferrer" className="social-link">linkedin</a>
          </nav>
        </header>

        <section className="page-section">
          <h2 className="section-label">About</h2>
          <p className="about-description">{PROFILE.DESCRIPTION}</p>
        </section>

        <section className="page-section">
          <h2 className="section-label">Work</h2>
          <div className="work-list">
            {WORK_HISTORY.map((job, index) => (
              <WorkItem key={index} role={job.role} company={job.company} duration={job.duration} />
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-label">Writing</h2>
          <div className="writing-list">
            {articles.map(article => (
              <WritingItem
                key={article.id}
                id={article.id}
                title={article.title}
                date={article.date}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
