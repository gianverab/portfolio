import React from "react";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

const SocialMedia: React.FC = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://github.com/gianverab" target="_blank" rel="noreferrer">
          <BsGithub />
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/gianvera/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
      </div>
      <div>
        <a href="https://twitter.com/gianvera" target="_blank" rel="noreferrer">
          <BsTwitter />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
