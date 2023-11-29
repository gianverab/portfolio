import React from "react";
import { motion } from "framer-motion";
import { AppWrap } from "../../wrapper";
import "./About.scss";

const About: React.FC = () => {
  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Apps</span> <br />
        means <span>Good Business</span>
      </h2>
      <div className="app__profile">
        <motion.div
          whileInView={{ x: [100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="app__profile-item"
        >
          <p className="p-text">
            I have over 6 years of experience in frontend development. With a
            keen eye for detail and a strong commitment to best practices, I
            have collaborated with designers, product managers, and other
            developers to create high-quality web applications.
          </p>
          <br />
          <p className="p-text">
            My expertise in JavaScript and React has allowed me to build complex
            applications, and to deliver fast, responsive, and accessible
            websites.{" "}
            {/* I am always eager to stay up-to-date with the latest web
            development trends and technologies, and I approach every project
            with a growth mindset. */}
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(About, "about");
