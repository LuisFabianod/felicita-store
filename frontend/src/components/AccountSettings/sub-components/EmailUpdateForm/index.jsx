import './styles.css'
import React, { useRef, useState, useContext} from 'react'
import { handleSubmit } from './api/handleSubmit'

import closeIcon from '../../../../images/x.png'
import showPasswordIcon from '../../../../images/open-eye.png'
import hidePasswordIcon from '../../../../images/closed-eye.png'
import { IsLoadingContext } from '../../../../Contexts/isLoading'

export const EmailUpdateForm = ({emailUpdateFormDisplay, setEmailUpdateFormDisplay}) => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const email2Ref = useRef(null);
  const passwordRef = useRef(null);

  const [passwordIcon, setPasswordIcon ] = useState(hidePasswordIcon)

  const [showPassword, setShowPassword ] = useState('password')

  const [apiMessage, setApiMessage] = useState('');

  const { setIsLoading } = useContext(IsLoadingContext);

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // estado para controle da animação de erro da span erro

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false);

  const handleShowPasswordClick = () => {
    if(showPassword === 'password'){
      setShowPassword('text')
      setPasswordIcon(showPasswordIcon)
    }else{
      setShowPassword('password')
      setPasswordIcon(hidePasswordIcon)
    }
  }

  const triggerErrorMessageShake = () => { // ativa a animação de erro nos inputs 
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

 return (
    <dialog className='secure-update-form'style={{display: emailUpdateFormDisplay}}>
     <div className='form-update' >
    
      <form  className='form' onSubmit={(e) => handleSubmit(e, emailRef, email2Ref, passwordRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <div className='div-close-icon'>
        <img src={closeIcon} alt="close-icon" className='close-form-icon' onClick={() => setEmailUpdateFormDisplay('none')}/>
        </div>
        <h1>Alterar Email</h1>
        <div className='update-email'>
          <div className='email'>
            <input type='email' placeholder='*Novo e-mail' name='email' id='email' ref={emailRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='update-email'>
          <div className='email'>
            <input type='email' placeholder='*Repita o novo e-mail' name='email2' id='email2' ref={email2Ref}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='update-password'>
            <div className='password-input'>
              <input type={showPassword} placeholder='*Sua senha' name='password'  ref={passwordRef}></input>
              <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{width: '20px', height: '20px', cursor: 'pointer'}}/>
            </div>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

        <button onSubmit={handleSubmit}>Salvar alterações</button>

      </form>

    </div>
    </dialog>
  )
}