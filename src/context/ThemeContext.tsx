import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'gvb_theme'

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light'

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
        if (stored === 'light' || stored === 'dark') return stored

        const prefersDark = window.matchMedia?.(
            '(prefers-color-scheme: dark)'
        ).matches

        return prefersDark ? 'dark' : 'light'
    } catch {
        // localStorage can fail in some privacy modes
        return 'light'
    }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        try {
            window.localStorage.setItem(STORAGE_KEY, theme)
        } catch {
            // ignore
        }
    }, [theme])

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextValue => {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return ctx
}
