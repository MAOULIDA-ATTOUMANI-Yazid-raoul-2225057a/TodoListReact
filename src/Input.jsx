import React from 'react';

function Input({ type, value, onChange, placeholder }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default Input;
