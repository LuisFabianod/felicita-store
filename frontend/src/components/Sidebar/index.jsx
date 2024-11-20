import './styles.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import closeIcon from '../../images/x.png'
import { handleExit } from './api/handleExit'

export const Sidebar = ({display, setDisplay}) => {

    const [apiMessage, setApiMessage] = useState(''); // Estado para mensagem da API (sucesso ou erro)

    const handleMenu = () => {
        setDisplay('none'); // muda o display da sideBar para none quando o closeIcon é clicado
    }

    return (
        <dialog style={{display}}> 
            
            <header className='dialog-header'>
                <p>Olá, {localStorage.getItem('userName')}</p>
                <img src={closeIcon} alt="close-modal-icon" className='close-modal-icon' onClick={handleMenu}/>
            </header>

            <section className='dialog-section'>
                <Link to={'/account'}>Minha conta</Link>
            </section>
            
            <footer className='dialog-footer'>
            {apiMessage && <div className="api-message">{apiMessage}</div>}
                <button className='exit-account' onClick={() => handleExit(setApiMessage)}>
                    SAIR
                </button>
            </footer>
            
        </dialog>
    )
}