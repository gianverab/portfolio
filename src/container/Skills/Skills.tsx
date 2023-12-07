import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { Experience, Skill } from "../../lib/types";
import { sortbyYear } from "../../lib/utils";
import "./Skills.scss";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const query = `
    *[_type == "experiences"] {
        _id,
        year,
        works,
    }`;
    const skillsQuery = `
    *[_type == "skills"] {
      name,
      bgColor,
        _id,
        "iconSrc": icon.asset->url
    }`;

    const getExperiences = async () => {
      const data: Experience[] = await client.fetch(query);
      // Sort the array using the sort by year function
      data.sort(sortbyYear);
      setExperiences(data);
    };

    getExperiences();

    const getSkills = async () => {
      const data: Skill[] = await client.fetch(skillsQuery);
      setSkills(data);
    };

    getSkills();
  }, []);

  return (
    <>
      <h2 className="head-text">
        Skills & <span>Experience</span>
      </h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill._id}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={skill.iconSrc} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience._id}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <div key={work._key}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-id={work._key}
                      data-tooltip-content={work.description}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip id={work._key} className="skills-tooltip" />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const SkillsContainer = AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);

export default SkillsContainer;
