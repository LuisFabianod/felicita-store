import './styles.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Função para fazer o fetch e verificar o login
    const verificarLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/verificar-login', {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setIsLoggedIn(data.loggedIn); 
            } else {
                console.error('Erro na verificação de login');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        verificarLogin();
    }, []);

    return (
        <header>
            <nav>
                <img src="" alt="logo-felicita" />
                {isLoggedIn? <img src="" alt="menu-icon" /> : <Link to="/auth">Fazer login</Link>}
            
            </nav>
        </header>
    )
}