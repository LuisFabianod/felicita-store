import './styles.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ placeholder, className}) => {
    const [value, setValue] = useState('');

    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (value.trim() !== '') {
                navigate(`/search/?searchValue=${encodeURIComponent(value)}`);
            }
        }
    };

    return (
        <div className={`search-bar-div ${className}`}>
            <input
                type="text"
                name="search-bar"
                className="search-bar"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};