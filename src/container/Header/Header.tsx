import React from "react";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { AppWrap } from "../../wrapper";
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header: React.FC = () => {
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <h1>Hello, my name is Giancarlo Vera</h1>
        <p>
          Frontend Developer with experience developing React and TypeScript
          applications.
        </p>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="Giancarlo's picture" />
      </motion.div>
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-tech"
      >
        {[images.react, images.javascript, images.typescript].map(
          (img, index) => (
            <div key={`img-${index}`}>
              <img src={img} alt="Tech Stack" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

const HeaderContainer = AppWrap(Header, "home");

export default HeaderContainer;
