import './styles.css'
import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'
import { usePutInputValuesEffect } from './hooks/usePutInputValuesEffect'

export const AccountSettings = () => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
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
 
  usePutInputValuesEffect(nomeRef, emailRef);   

 return (
    <>
    <div className='form-update'>
      <form  className='form' onSubmit={(e) => handleSubmit(e, nomeRef , emailRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Meus Dados</h1>
        <div className='update-nome'>
          <div className='nome'>
            <input type='text' placeholder='*Nome completo' name='nome' id='nome' ref={nomeRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='update-email'>
          <input type="email" placeholder='*Email' name='email' id='email' ref={emailRef}></input>
          <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>

        <button type='submit'>Salvar alterações</button>
      </form>

    </div>
    </>
  )
}