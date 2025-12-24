import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // FORCED LIGHT MODE - Investors require light mode for accessibility
    const [theme] = useState<Theme>('light');

    useEffect(() => {
        // Always ensure light mode - remove dark class if present
        const root = document.documentElement;
        root.classList.remove('dark');
        localStorage.setItem('billionaireable-theme', 'light');
    }, []);

    // Toggle is disabled - always stays light
    const toggleTheme = () => {
        // No-op: Light mode is enforced for investor accessibility
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};


