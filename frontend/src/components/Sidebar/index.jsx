import './styles.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import closeIcon from '../../images/x.png'
import { handleExit } from './api/handleExit'

export const Sidebar = ({display, setDisplay, isAdmin}) => {

    const [apiMessage, setApiMessage] = useState(''); // Estado para mensagem da API (sucesso ou erro)

    const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro mensagem da API

    const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message 
    setIsApiMessageShaking(true);
    setTimeout(() => setIsApiMessageShaking(false), 1000); // Duração da animação
    };  

    const handleMenu = () => {
        setDisplay('none'); // muda o display da sideBar para none quando o closeIcon é clicado
    }

    return (
        <dialog style={{display}} className='sidebar'> 
            
            <header className='sidebar-header'>
                <p>Olá, {localStorage.getItem('userName')}</p>
                <img src={closeIcon} alt="close-modal-icon" className='close-modal-icon' onClick={handleMenu}/>
            </header>

            <section className='sidebar-section'>
                <Link to={'/account'}>Minha conta</Link>
                {isAdmin && <Link to={'/admin-interface'}>Interface administrador</Link>}
            </section>
            
            <footer className='sidebar-footer'>
            {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`}>{apiMessage}</div>}
                <button className='exit-account' onClick={() => handleExit(setApiMessage, triggerApiMessageShake)}>
                    SAIR
                </button>
            </footer>
            
        </dialog>
    )
}