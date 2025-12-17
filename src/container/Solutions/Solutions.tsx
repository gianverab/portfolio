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
  *[_type == "solutions"] {
    title,
      description,
      _id,
      "imageUrl": imgUrl.asset->url,
      order
  }`

        const getSolutions = async () => {
            const data: Solution[] = await client.fetch(query)
            const sortedData = data.sort((a, b) => {
                return a.order - b.order
            })
            setSolutions(sortedData)
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
                        <div className="app__proposals-content">
                            <h4 className="bold-text">{solution.title}</h4>
                            <p className="p-text">{solution.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

const SolutionsContainer = AppWrap(
    MotionWrap(Solutions, 'app__solutions'),
    'solutions',
    'app__primarybg'
)

export default SolutionsContainer
