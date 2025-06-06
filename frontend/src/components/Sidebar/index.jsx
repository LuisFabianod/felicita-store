import './styles.css'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { handleExit } from './api/handleExit'
import { SearchBar } from '../SearchBar';

import { IsAdminContext } from '../../Contexts/IsAdmin';
import { IsLoggedInContext } from '../../Contexts/IsLoggedIn';
import { IsLoadingContext } from '../../Contexts/IsLoading';

import userIcon from '../../assets/images/user.png';
import configIcon from '../../assets/images/config.png'
import closeIcon from '../../assets/images/x.png'
import bagIcon from '../../assets/images/bag.png'
import heartIcon from '../../assets/images/heart.png'

export const Sidebar = ({display, setDisplay}) => {

    const [apiMessage, setApiMessage] = useState(''); // Estado para mensagem da API (sucesso ou erro)

    const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro mensagem da API

    const { setIsLoading } = useContext(IsLoadingContext);
    const { isAdmin } = useContext(IsAdminContext)
    const { isLoggedIn } = useContext(IsLoggedInContext)


    const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message 
    setIsApiMessageShaking(true);
    setTimeout(() => setIsApiMessageShaking(false), 1000); // Duração da animação
    };  

    const handleMenu = () => {
        setDisplay('none'); // muda o display da sideBar para none quando o closeIcon é clicado
    }

    const userName = localStorage.getItem('userName');

    return (
        <dialog style={{display}} className='sidebar' open={display === 'none'? false : true}> 
            
            <header className='sidebar-header'>
                <p>Olá, {userName? userName : <Link to={'login'}>Acesse sua conta</Link>}</p>
                <img src={closeIcon} alt="close-modal-icon" className='close-modal-icon' onClick={handleMenu}/>
            </header>

            <SearchBar className={'sidebar-searchbar'} placeholder={'Oque você está buscando?'} />

            <section className='sidebar-section'>
                {isLoggedIn && 
                <div className='sidebar-section-div'>
                    <Link to={'/account'}> <img className='mini-icon' src={userIcon} alt='user-icon'></img></Link>
                    <Link to={'/account'} className='sidebar-section-link'>Minha conta</Link>
                </div>
                }
                {isAdmin &&
                <div className='sidebar-section-div'>
                     <Link to={'/admin-interface'}><img className='mini-icon' src={configIcon} alt='config-icon'></img></Link>
                    <Link to={'/admin-interface'} className='sidebar-section-link'>Interface administrador</Link>
                </div>
                }
                <div className='sidebar-section-div'>
                     <Link to={'/shopping-cart'}><img className='mini-icon' src={bagIcon} alt='config-icon'></img></Link>
                    <Link to={'/shopping-cart'} className='sidebar-section-link'>Carrinho</Link>
                </div>
                {isLoggedIn && 
                <div className='sidebar-section-div'>
                     <Link to={'/favorite-products'}><img className='mini-icon' src={heartIcon} alt='config-icon'></img></Link>
                    <Link to={'/favorite-products'} className='sidebar-section-link'>Favoritos</Link>
                </div>
                }
                
            </section>
            
            <footer className='sidebar-footer'>
            {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`}>{apiMessage}</div>}
                {
                    isLoggedIn?
                    <button className='exit-account' onClick={() => handleExit(setApiMessage, triggerApiMessageShake, setIsLoading)}>SAIR</button>
                    :<>
                    <Link to={'/login'}><button className='log-in-button'>ENTRAR</button></Link>
                    <Link to={'/register'}><button className='log-in-button'>CADASTRE-SE</button></Link>
                    </>
                }
                
            </footer>
            
        </dialog>
    )
}