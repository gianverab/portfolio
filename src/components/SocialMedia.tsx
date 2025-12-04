import React from 'react'
import { BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs'

const SocialMedia: React.FC = () => {
    return (
        <div className="app__social">
            <button>
                <a
                    href="https://github.com/gianverab"
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsGithub />
                </a>
            </button>
            <button>
                <a
                    href="https://www.linkedin.com/in/gianvera/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsLinkedin />
                </a>
            </button>
            <button>
                <a
                    href="https://twitter.com/gianvera"
                    target="_blank"
                    rel="noreferrer"
                >
                    <BsTwitter />
                </a>
            </button>
        </div>
    )
}

export default SocialMedia
