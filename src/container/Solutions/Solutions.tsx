import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Solutions.scss'
import { Solution } from '../../lib/types'
import { client } from '../../sanity/client'

const Solutions: React.FC = () => {
    const [solutions, setSolutions] = useState<Solution[]>([])

    useEffect(() => {
        const query = `
  *[_type == "solution"] {
    title,
      description,
      _id,
      "imageUrl": imgUrl.asset->url
  }`

        const getSolutions = async () => {
            const data: Solution[] = await client.fetch(query)
            setSolutions(data)
        }

        getSolutions()
    }, [])

    return (
        <>
            <h2 className="head-text">
                What can<span> I do?</span>
            </h2>
            <div className="app__proposals">
                {solutions.map((solution) => (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: 'tween' }}
                        className="app__proposals-item"
                        key={solution._id}
                    >
                        <img src={solution.imageUrl} alt={solution.title} />
                        <h2 className="bold-text" style={{ marginTop: 20 }}>
                            {solution.title}
                        </h2>
                        <p className="p-text" style={{ marginTop: 10 }}>
                            {solution.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

const SolutionsContainer = AppWrap(
    MotionWrap(Solutions, 'app__solutions'),
    'solutions',
    'app__whitebg'
)

export default SolutionsContainer
