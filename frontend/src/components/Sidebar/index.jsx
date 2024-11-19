import './styles.css'
import React from 'react'
import closeIcon from '../../images/x.png'

export const Sidebar = ({display, setDisplay}) => {

    const handleExit = async () => {
        try {
            // Faz a requisição para a rota de logout no backend
            const response = await fetch('http://localhost:5000/login/logout', {
                method: 'POST',
                credentials: 'include', // Inclui cookies na requisição
                body: {
                    
                }
            });
        
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Erro ao sair da conta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao sair da conta:', error);
        }
    };

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
                <button className='exit-account' onClick={handleExit}>
                    SAIR
                </button>
            </footer>
            
        </dialog>
    )
}