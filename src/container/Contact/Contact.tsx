import React, { useState } from 'react'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../sanity/client'
import './Contact.scss'
import { FormData } from '../../lib/types'
import EmailIcon from '../../svg/EmailIcon'
import PhoneIcon from '../../svg/PhoneIcon'

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    })
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const { name, email, message } = formData

    const handleChangeInput = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        console.log(e.currentTarget.value)
        const { name, value } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        setLoading(true)

        const contact = {
            _type: 'contact',
            name: name,
            email: email,
            message: message,
        }

        client
            .create(contact)
            .then(() => {
                setLoading(false)
                setIsFormSubmitted(true)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <h2 className="head-text">
                Get in <span>touch</span>
            </h2>

            <div className="app__contact-cards">
                <div className="app__contact-card ">
                    <EmailIcon />
                    <a href="mailto:gianverab@gmail.com" className="p-text">
                        gianverab@gmail.com
                    </a>
                </div>
                <div className="app__contact-card">
                    <PhoneIcon />
                    <a href="tel:+51 1 989207668" className="p-text">
                        +51 1 989207668
                    </a>
                </div>
            </div>
            {!isFormSubmitted ? (
                <div className="app__contact-form app__flex">
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            value={name}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="email"
                            placeholder="Your Email"
                            name="email"
                            value={email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <textarea
                            className="p-text"
                            placeholder="Your Message"
                            value={message}
                            name="message"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button
                        type="button"
                        className="p-text"
                        onClick={handleSubmit}
                    >
                        {!loading ? 'Send Message' : 'Sending...'}
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">
                        Thank you for getting in touch!
                    </h3>
                </div>
            )}
        </>
    )
}

const ContactContainer = AppWrap(
    MotionWrap(Contact, 'app__contact'),
    'contact',
    'app__primarybg'
)

export default ContactContainer
