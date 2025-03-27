import './styles.css'
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { verifySession } from './api/verifySession';
import { SearchBar } from '../SearchBar';
import { Sidebar } from '../Sidebar';
import menuIcon from '../../assets/images/menu-aberto.png';
import userIcon from '../../assets/images/user.png';
import logo from '../../assets/images/logo-1664432756-1710783691-e7c9f15949d0fb60bd64eba7c0a25daf1710783691-320-0.webp'

import { IsAdminContext } from '../../Contexts/IsAdmin';
import { IsLoadingContext } from '../../Contexts/IsLoading';

export const Header = () => {

    const { isAdmin, setIsAdmin } = useContext(IsAdminContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [display, setDisplay] = useState('none');

    const { setIsLoading } = useContext(IsLoadingContext)

    useEffect(() => {
        verifySession(setIsLoggedIn, setIsAdmin, setIsLoading);
    }, [setIsAdmin, setIsLoading]);

    const handleMenu = () => {
        setDisplay('flex');
    };

    return (
        <>
            <Sidebar display={display} setDisplay={setDisplay} isAdmin={isAdmin} />
            <header className='header'>
                <div className='ad-bar'>
                    <div className='container-fluid'>
                        <p className='add-bar-message'>USE O CUPOM "BEMVINDA" E GANHE 10% OFF EM SUA PRIMEIRA COMPRA</p>
                    </div>
                </div>
                <nav className='nav'>
                    <div className='logo-and-searchbar'>

                        {isLoggedIn ? (
                            <img src={menuIcon} alt="menu-icon" className='icon' onClick={handleMenu} />
                        ) : (
                            <Link to="/auth"><img src={userIcon} alt="user-icon" className='icon' /></Link>
                        )}


                    </div>

                    <SearchBar placeholder={'Oque você está buscando?'} />

                    <Link to={'/'} className='logo'><img src={logo} alt="logo-felicita" className='logo-img' /></Link>

                </nav>
            </header>
        </>
    );
};
