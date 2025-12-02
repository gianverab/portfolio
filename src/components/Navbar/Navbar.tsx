import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { images } from '../../constants'
import { MenuItems } from '../../lib/types'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.scss'
import LightIcon from '../../svg/LightIcon'
import DarkIcon from '../../svg/DarkIcon'

const Navbar: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [activeMenuItem, setActiveMenuItem] = useState('home')
    const { theme, toggleTheme } = useTheme()
    // Convert enum into an array
    const menuItems: string[] = Object.values(MenuItems)

    const handleMenuItemClick = (menuItem: string) => {
        setActiveMenuItem(menuItem)
    }

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <a href="#home">
                    <img src={images.logo} alt="Gianverab's logo" />
                </a>
            </div>
            <ul className="app__navbar-links">
                {menuItems.map((item) => (
                    <li className="app__flex p-text" key={`link-${item}`}>
                        <div />
                        <a
                            href={`#${item.toLowerCase()}`}
                            onClick={() =>
                                handleMenuItemClick(item.toLowerCase())
                            }
                            className={
                                activeMenuItem === item.toLowerCase()
                                    ? 'active-link'
                                    : ''
                            }
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="app__navbar-actions">
                <button
                    type="button"
                    aria-label="Toggle dark mode"
                    className="theme-toggle"
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? <DarkIcon /> : <LightIcon />}
                </button>
            </div>
            <div className="app__navbar-menu">
                <HiMenu onClick={() => setToggleMenu(true)} />

                {toggleMenu && (
                    <motion.div
                        whileInView={{ x: [120, 0] }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setToggleMenu(false)} />
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setToggleMenu(false)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
