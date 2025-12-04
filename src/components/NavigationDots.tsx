import React from 'react'
import { MenuItems } from '../lib/types'

type NavigationDotsProps = {
    active: string
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
    active,
}: NavigationDotsProps) => {
    // Convert enum into an array
    const menuItems: string[] = Object.values(MenuItems)

    return (
        <div className="app__navigation">
            {menuItems.map((item, index) => (
                <a
                    href={`#${item.toLowerCase()}`}
                    key={`${item}${index}`}
                    className={`app__navigation-dot ${
                        active === item.toLowerCase() ? 'active-dot' : ''
                    }`}
                />
            ))}
        </div>
    )
}

export default NavigationDots
