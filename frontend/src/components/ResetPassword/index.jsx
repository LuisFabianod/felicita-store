import './styles.css'
import React, { useRef, useState } from "react";
import { handleSubmit } from './api/handleSubmit';

import { PasswordChecks } from '../form-cadastro/sub-components/password-check';

const params = new URLSearchParams(window.location.search); // pegando o token do usuário na query param
export const ResetPassword = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const passwordRef = useRef(null);  
  const password2Ref = useRef(null);

  const token = params.get('token')

  const [apiMessage, setApiMessage] = useState('');   // Estado para feedback da API (sucesso ou erro)

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // Estado para animação de erro mensagem dos inputs

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro da div api-message

  const triggerErrorMessageShake = () => { // ativa a animação de erro nos inputs 
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message 
    setIsApiMessageShaking(true);
    setTimeout(() => setIsApiMessageShaking(false), 1000); // Duração da animação
  };  

  return(
    <>
    <div className='reset-password-div'>
      <div className='form-cadastro'>
        <form className='form' onSubmit={(e) => handleSubmit(e, token , passwordRef, password2Ref, setApiMessage,  triggerApiMessageShake, triggerErrorMessageShake)}>
       {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Faça seu login</h1>
            <div className='password'>
              <input type='password' placeholder='*Nova Senha' name='password' ref={passwordRef}></input>
              <span   className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>
            <div className='password'>
              <input type='password' placeholder='*Confirmar senha' name='password2' ref={password2Ref}></input>
              <span   className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>
            <button type='submit'>Alterar senha</button>
            <PasswordChecks passwordRef={passwordRef}/>
        </form>
      </div>
      </div>
    </>  
  )
}