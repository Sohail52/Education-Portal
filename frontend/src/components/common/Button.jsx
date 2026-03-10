import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyles = "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-glow overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-softBlue-500 to-softBlue-600 text-white hover:translate-y-[-2px]",
        secondary: "bg-surface text-secondary border border-border hover:bg-app hover:border-softBlue-300",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
        ghost: "text-secondary hover:bg-app shadow-none",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Watery Ripple Effect Layer */}
            <span className="absolute inset-0 w-full h-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full origin-center opacity-0 group-hover:opacity-100 pointer-events-none"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
};

export default Button;
