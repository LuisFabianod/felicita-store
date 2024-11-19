import './styles.css'
import React, { useState } from 'react'
import closeIcon from '../../images/x.png'
import handleExit from './api/handleExit'

export const Sidebar = ({display, setDisplay}) => {

    // Estado para feedback da API (sucesso ou erro)
    const [apiMessage, setApiMessage] = useState('');

    const handleMenu = () => {
        setDisplay('none')
    }

    return (
        <dialog style={{display}}>
            
            <header className='dialog-header'>
                <p>Olá fulano</p>
                <img src={closeIcon} alt="close-modal-icon" className='close-modal-icon' onClick={handleMenu}/>
            </header>

            <section className='dialog-section'>

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