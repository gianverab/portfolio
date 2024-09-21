import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { About } from "../../lib/types";
import { client } from "../../sanity/client";

const Abouts: React.FC = () => {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    const query = `
  *[_type == "about"] {
    title,
      description,
      _id,
      "imageUrl": imgUrl.asset->url
  }`;

    const getAbouts = async () => {
      const data: About[] = await client.fetch(query);
      setAbouts(data);
    };

    getAbouts();
  }, []);

  return (
    <>
      <h2 className="head-text">
        What can<span> I do?</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about._id}
          >
            <img src={about.imageUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const AboutContainer = AppWrap(
  MotionWrap(Abouts, "app__about"),
  "about",
  "app__whitebg"
);

export default AboutContainer;
