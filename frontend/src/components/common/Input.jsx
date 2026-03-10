import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, className = '' }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && <label className="text-sm font-medium text-secondary ml-1">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="px-4 py-3 rounded-xl bg-surface border border-border text-primary focus:outline-none focus:ring-2 focus:ring-softBlue-500/20 focus:border-softBlue-500 transition-all duration-300 placeholder:text-muted shadow-sm hover:shadow-md"
            />
        </div>
    );
};

export default Input;
