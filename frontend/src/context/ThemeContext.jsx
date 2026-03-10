import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 0: Warm (Ivory), 1: Dark (Charcoal), 2: Pastel
    const [themeIndex, setThemeIndex] = useState(0);

    const themes = ['warm', 'dark', 'pastel'];

    useEffect(() => {
        // Apply theme data-attribute to body
        document.body.setAttribute('data-theme', themes[themeIndex]);
    }, [themeIndex]);

    const toggleTheme = () => {
        setThemeIndex((prev) => (prev + 1) % themes.length);
    };

    return (
        <ThemeContext.Provider value={{ themeIndex, toggleTheme, currentTheme: themes[themeIndex] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
