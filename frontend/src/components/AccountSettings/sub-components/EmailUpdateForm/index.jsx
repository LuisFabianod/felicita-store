import './styles.css'
import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'

import closeIcon from '../../../../images/x.png'

export const EmailUpdateForm = ({emailUpdateFormDisplay, setEmailUpdateFormDisplay}) => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const email2Ref = useRef(null);
  const passwordRef = useRef(null);

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
    <dialog className='secure-update-form'style={{display: emailUpdateFormDisplay}}>
     <div className='form-update' >
    
      <form  className='form' onSubmit={(e) => handleSubmit(e, emailRef, email2Ref, passwordRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
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
          <div className='password'>
            <input type='password' placeholder='*Sua senha' name='password' id='password' ref={passwordRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>

        <button onSubmit={handleSubmit}>Salvar alterações</button>

      </form>

    </div>
    </dialog>
  )
}