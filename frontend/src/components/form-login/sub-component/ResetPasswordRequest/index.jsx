import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'

import closeIcon from '../../../../images/x.png'

export const ResetPasswordRequest = ({resetPasswordDisplay, setResetPasswordDisplay}) => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);

  const [apiMessage, setApiMessage] = useState('');

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false);

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false);

  const triggerErrorMessageShake = () => { // ativa a animação de erro nos inputs 
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

 return (
    <dialog className='secure-update-form'style={{display: resetPasswordDisplay}}>
     <div className='form-update'>
    
      <form  className='form' onSubmit={(e) => handleSubmit(e , emailRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <div className='div-close-icon'>
        <img src={closeIcon} alt="close-icon" className='close-form-icon' onClick={() => setResetPasswordDisplay('none')}/>
        </div>
        <h1>Esqueci minha senha</h1>
        <div className='update-email'>
          <div className='update-email'>
            <input type='email' placeholder='*Informe seu e-mail' name='email' ref={emailRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        

        <button type='submit'>Enviar</button>

      </form>

    </div>
    </dialog>
  )
}