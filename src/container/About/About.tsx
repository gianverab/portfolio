import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppWrap, MotionWrap } from '../../wrapper'
import { Stats } from '../../lib/types'
import { client } from '../../sanity/client'
import { images } from '../../constants'
import './About.scss'

const Abouts: React.FC = () => {
    const [stats, setStats] = useState<Stats[]>([])

    useEffect(() => {
        const query = `
    *[_type == "stats"] {
        value,
        _id,
        sign,
        label,
        order,
    }`

        const getStats = async () => {
            const data: Stats[] = await client.fetch(query)
            const sortedData = data.sort((a, b) => {
                return a.order - b.order
            })
            setStats(sortedData)
        }

        getStats()
    }, [])

    return (
        <>
            <h2 className="head-text">
                Who<span> I am</span>
            </h2>
            <div className="app__bio">
                <motion.div
                    className="app__bio-photo"
                    whileInView={{ opacity: [0, 1], y: [40, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={images.aboutPic} alt="Giancarlo Vera" />
                </motion.div>
                <motion.div
                    className="app__bio-text"
                    whileInView={{ opacity: [0, 1], y: [40, 0] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <p className="p-text">
                        I&apos;m a Frontend Developer based in Lima with more
                        than <strong>7 years of experience</strong> building
                        interfaces for the web and mobile. I started my path in
                        software development in Argentina, where I worked as a
                        freelancer helping small businesses and agencies bring
                        their ideas online.
                    </p>

                    <p className="p-text">
                        Since then I&apos;ve developed corporate sites, landing
                        pages, dashboards, e-commerce experiences and mobile
                        apps using{' '}
                        <strong>React, Next.js and React Native</strong>. I
                        focus on clean architecture, performance and creating
                        interfaces that feel simple and intuitive for real
                        users.
                    </p>

                    <p className="p-text">
                        When I&apos;m not coding, you&apos;ll usually find me
                        birding and doing wildlife photography. That patience
                        and attention to detail also shape the way I approach UI
                        work: observing carefully, looking for patterns and
                        polishing the small details that make an experience feel
                        alive.
                    </p>
                </motion.div>
            </div>
            <motion.div
                className="app__bio-stats"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {stats &&
                    stats.map((item) => (
                        <div className="app__bio-stat" key={item._id}>
                            <span className="app__bio-stat-value">
                                {item.value}
                            </span>
                            <span className="app__bio-stat-sign">
                                {item.sign}
                            </span>
                            <span className="app__bio-stat-label">
                                {item.label}
                            </span>
                        </div>
                    ))}
            </motion.div>
        </>
    )
}

const AboutContainer = AppWrap(
    MotionWrap(Abouts, 'app__about'),
    'about',
    'app__whitebg'
)

export default AboutContainer
