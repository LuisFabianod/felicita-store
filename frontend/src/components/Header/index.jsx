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
import { IsLoggedInContext } from '../../Contexts/IsLoggedIn';

export const Header = () => {

    const { setIsAdmin } = useContext(IsAdminContext);
    const { setIsLoggedIn } = useContext(IsLoggedInContext)
    const [display, setDisplay] = useState('none');

    const { setIsLoading } = useContext(IsLoadingContext)

    useEffect(() => {
        verifySession(setIsLoggedIn, setIsAdmin, setIsLoading);
    }, [setIsAdmin, setIsLoading, setIsLoggedIn]);

    const handleMenu = () => {
        setDisplay('flex');
    };

    return (
        <>
            <Sidebar display={display} setDisplay={setDisplay}  />
            <header className='header'>
                <div className='ad-bar'>
                    <div className='container-fluid'>
                        <p className='add-bar-message'>USE O CUPOM "PRIMEIRADEMUITAS" E GANHE 10% OFF EM SUA PRIMEIRA COMPRA</p>
                    </div>
                </div>
                <nav className='nav'>
                    <div className='nav-icons'>
                        <img src={menuIcon} alt="menu-icon" className='icon menu-icon' onClick={handleMenu} />
                        <Link to="/login"><img src={userIcon} alt="user-icon" className='icon user-icon' /></Link>

                    </div>

                    <SearchBar className={'header-searchbar'} placeholder={'Oque você está buscando?'} />

                    <Link to={'/'} className='logo'><img src={logo} alt="logo-felicita" className='logo-img' /></Link>

                </nav>
            </header>
        </>
    );
};
