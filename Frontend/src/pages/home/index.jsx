import React, { useEffect } from 'react';
import './index.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">Welcome to My Portfolio</h1>

      <div className="education">
        <h2>Education</h2>
        <p>
          <strong>Master of Science in Information Systems, Northeastern University, Boston</strong><br />
          Jan 2022 - May 2023
        </p>
        <p>
          <strong>Bachelor of Science in Information System, Zhejiang Sci-Tech University, China</strong><br />
          Sep 2016 - Jul 2020
        </p>
      </div>

      <div className="skills">
        <h2>Skills</h2>
        <ul>
          <li>Programming Languages: Java, JavaScript, TypeScript, Python, HTML, CSS, SQL, NoSQL(MongoDB), R, GraphQL, C, Script language(shell, JSON, XML)</li>
          <li>Frameworks: React.js (Redux, React hooks), Vue.js, Node.js, Git, Linux, Spring, RocketMQ, D3.js</li>
          <li>Others: Distributed system (Hadoop, Redis), Server Deployment and Cloud Services (AWS, Docker, Jenkins, Maven)</li>
          <li>Microsoft Office applications (Word, Excel), Agile methodologies, Performance Test, Problem-solving and analytical skills, Personality (interpersonal communication skills, self-motivated, leadership)</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
