import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { Project, WorkItems } from "../../lib/types";
import "./Work.scss";

const Work: React.FC = () => {
  // Convert enum into an array
  const workItems: string[] = Object.values(WorkItems);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterProject, setFilterProject] = useState<Project[]>([]);

  useEffect(() => {
    const query = `
    *[_type == "works"] {
      description,
        _id,
        title,
        tags,
        codeLink,
        projectLink,
        "imageUrl": imgUrl.asset->url
    }`;

    const getProjects = async () => {
      const data: Project[] = await client.fetch(query);
      setProjects(data);
      setFilterProject(data);
    };

    getProjects();
  }, []);

  const handleFilterProject = (item: string) => {
    setActiveFilter(item);
    console.log(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === "ALL") {
        setFilterProject(projects);
      } else {
        setFilterProject(
          projects.filter((project) => project.tags.includes(item))
        );
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        What I <span>have done</span>
      </h2>
      <div className="app__work-filter">
        {workItems.map((item, index) => (
          <div
            key={`${index}-${item}`}
            onClick={() => handleFilterProject(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterProject.map((project) => (
          <div className="app__work-item app__flex" key={project._id}>
            <div className="app__work-img app__flex">
              <img src={project.imageUrl} alt={project.title} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={project.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>
            <div className="app__work-content app__flex">
              <h4 className="bold-text">{project.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {project.description}
              </p>
              <div className="app__work-tag app__flex">
                <p className="p-text">{project.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

const WorkContainer = AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);

export default WorkContainer;
