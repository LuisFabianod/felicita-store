import './styles.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { verifySession } from './api/verifySession';
import { SearchBar } from './sub-components/SearchBar';
import { Sidebar } from '../Sidebar';
import menuIcon from '../../images/menu-aberto.png';

export const Header = ({ getIsAdmin }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        if(getIsAdmin){
            getIsAdmin(isAdmin);  // Passa o valor de isAdmin para o componente pai
        }
        
    }, [isAdmin, getIsAdmin]);

    useEffect(() => {
        verifySession(setIsLoggedIn, setIsAdmin);
    }, [setIsAdmin]);

    const handleMenu = () => {
        setDisplay('flex');
    };

    const userEmail = localStorage.getItem('userEmail');

    return (
        <>
            <Sidebar display={display} setDisplay={setDisplay} isAdmin={isAdmin} />
            <header className='header'>
                <nav className='nav'>
                    <div className='menu-and-logo'>
                        {isLoggedIn ? (
                            <img src={menuIcon} alt="menu-icon" className='menu-icon' onClick={handleMenu} />
                        ) : (
                            <Link to="/auth">Fazer login</Link>
                        )}
                        <Link to={'/'}><img src="" alt="logo-felicita" /></Link>
                    </div>
                    <SearchBar />
                    <div>{isLoggedIn ? userEmail : 'Olá Cliente!'}</div>
                </nav>
            </header>
        </>
    );
};
