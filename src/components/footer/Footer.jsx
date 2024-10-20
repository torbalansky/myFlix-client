import React from 'react';
import { PiLinkedinLogo } from 'react-icons/pi';
import { LiaGithubSquare, LiaResearchgate } from 'react-icons/lia';
import './footer-view.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="text-center mt-4 p-2 opacity-90 text-xs">
        <a href="https://www.linkedin.com/in/pacostathis/" target="_blank" rel="noopener noreferrer">
          <PiLinkedinLogo className="icon md" />
        </a>
        <a href="https://github.com/torbalansky" target="_blank" rel="noopener noreferrer">
          <LiaGithubSquare className="icon lg" />
        </a>
        <a href="https://www.researchgate.net/profile/Silviya-Stateva" target="_blank" rel="noopener noreferrer">
          <LiaResearchgate className="icon lg" />
        </a>
      </div>
      <div className="text-center mt-1 p-2 text-white opacity-90 text-xs">
        © 2024 <a href="https://github.com/torbalansky" className="text-green-400 hover:text-red-200">Paco/torbalansky</a>
      </div>
    </div>
  );
};

export default Footer;
