import './styles.css'
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { verifySession } from './api/verifySession';
import { SearchBar } from './sub-components/SearchBar';
import { Sidebar } from '../Sidebar';
import menuIcon from '../../images/menu-aberto.png';
import { IsAdminContext } from '../../Contexts/IsAdmin';

export const Header = ({ getIsAdmin }) => {

    const {isAdmin, setIsAdmin} = useContext(IsAdminContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [display, setDisplay] = useState('none');

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
