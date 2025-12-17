import React, { useState, useEffect } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../sanity/client'
import { Project, WorkItems } from '../../lib/types'
import './Work.scss'

const Work: React.FC = () => {
    // Convert enum into an array
    const workItems: string[] = Object.values(WorkItems)
    const [activeFilter, setActiveFilter] = useState<string>('All')
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

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
    }`

        const getProjects = async () => {
            const data: Project[] = await client.fetch(query)
            const sortedData = data.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            setProjects(sortedData)
            setFilteredProjects(sortedData)
        }

        getProjects()
    }, [])

    const handleFilteredProjects = (item: string) => {
        setActiveFilter(item)
        console.log(item)
        setAnimateCard({ y: 100, opacity: 0 })

        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 })
            if (item === 'ALL') {
                setFilteredProjects(projects)
            } else {
                setFilteredProjects(
                    projects.filter((project) => project.tags.includes(item))
                )
            }
        }, 500)
    }

    return (
        <>
            <h2 className="head-text">
                What I <span>have done</span>
            </h2>
            <div className="app__work_filter">
                {workItems.map((item, index) => (
                    <div
                        key={`${index}-${item}`}
                        onClick={() => handleFilteredProjects(item)}
                        className={`app__work_filter-item app__flex ${
                            activeFilter === item ? 'item-active' : ''
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__work_portfolio"
            >
                {filteredProjects.map((project) => (
                    <div
                        className="app__work_portfolio-item app__flex"
                        key={project._id}
                    >
                        <div className="app__work_portfolio-img app__flex">
                            <img src={project.imageUrl} alt={project.title} />
                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: 'easeInOut',
                                    staggerChildren: 0.5,
                                }}
                                className="app__work_portfolio-hover app__flex"
                            >
                                <a
                                    href={project.projectLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
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
                                    <a
                                        href={project.codeLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
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
                        <div className="app__work_portfolio-content app__flex">
                            <h4 className="bold-text">{project.title}</h4>
                            <p className="p-text">{project.description}</p>
                            <div className="app__work_portfolio-tag app__flex">
                                <p className="p-text">{project.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </>
    )
}

const WorkContainer = AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    'app__whitebg'
)

export default WorkContainer
