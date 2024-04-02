import React from 'react';

function MyButton({ name, onClick }) {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

export default MyButton;
