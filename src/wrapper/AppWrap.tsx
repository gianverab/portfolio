import React from 'react'
import NavigationDots from '../components/NavigationDots'
import SocialMedia from '../components/SocialMedia'
import { useTheme } from '../context/ThemeContext'

const AppWrap = (
    Component: React.ComponentType,
    idName: string,
    classNames?: string
) =>
    function HOC() {
        const { theme } = useTheme()
        return (
            <div
                id={idName}
                className={`app__container ${classNames} ${
                    theme === 'dark' ? 'dark-theme' : ''
                }`}
            >
                <SocialMedia />
                <div className="app__wrapper app__flex">
                    <Component />

                    <div className="copyright">
                        <p className="p-text">@2023 GianVeraB</p>
                        <p className="p-text">All rights reserved</p>
                    </div>
                </div>
                <NavigationDots active={idName} />
            </div>
        )
    }

export default AppWrap
