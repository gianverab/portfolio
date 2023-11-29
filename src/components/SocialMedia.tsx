import React from "react";
import { BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

const SocialMedia: React.FC = () => {
  return (
    <div className="app__social">
      <div>
        <BsGithub />
      </div>
      <div>
        <BsLinkedin />
      </div>
      <div>
        <BsTwitter />
      </div>
    </div>
  );
};

export default SocialMedia;
