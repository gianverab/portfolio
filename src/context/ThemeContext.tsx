import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'gvb_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
        const prefersDark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches

        setTheme(stored ?? (prefersDark ? 'dark' : 'light'))
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        window.localStorage.setItem(STORAGE_KEY, theme)
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
