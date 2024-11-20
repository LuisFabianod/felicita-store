import './styles.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { verifySession } from './utils/verificarLogin';

import { SearchBar } from './sub-components/SearchBar';
import { Sidebar } from '../Sidebar';
import menuIcon from '../../images/menu-aberto.png'

// declaração do componente Header
export const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // declaração do estado (logado / não-logado)
    const [display, setDisplay] = useState('none'); // declaração do estado do sidebar (aberto / fechado)

    // é ativado toda vez que o componente é montado, verifica se o usuário está logado
    useEffect(() => {
        verifySession(setIsLoggedIn);
    }, []);

    const handleMenu = () => {
        setDisplay('flex')
    }
    
    const userEmail = localStorage.getItem('userEmail')

    return (
        <>
        <Sidebar display={display} setDisplay={setDisplay}/>
        <header className='header'>
            <nav className='nav'>
                <div className='menu-and-logo'>
                {
                isLoggedIn? <img src={menuIcon} alt="menu-icon" className='menu-icon' onClick={handleMenu}/> : <Link to="/auth">Fazer login</Link> 
                 }
                
                <img src="" alt="logo-felicita" />
                </div>
                <SearchBar/>
                <div>{userEmail? userEmail : 'Olá Cliente!'}</div>
            </nav>
        </header>
        </>
    )
}