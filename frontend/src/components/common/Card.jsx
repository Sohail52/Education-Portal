import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, progress = null }) => {
    return (
        <div
            className={`
                bg-surface rounded-3xl border border-border p-6 shadow-sm relative overflow-hidden
                ${hoverEffect ? 'hover:shadow-float hover:-translate-y-1 transition-all duration-300 group' : ''}
                ${className}
            `}
        >
            {children}
            {progress !== null && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-cream-100">
                    <div
                        className="h-full bg-accent-primary transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default Card;
