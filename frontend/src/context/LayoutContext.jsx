import { createContext, useState, useEffect } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isFocusMode, setIsFocusMode] = useState(false);

    const toggleFocusMode = () => setIsFocusMode(prev => !prev);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFocusMode) {
                setIsFocusMode(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFocusMode]);

    return (
        <LayoutContext.Provider value={{ isFocusMode, toggleFocusMode }}>
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutContext;
