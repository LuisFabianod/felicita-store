import './styles.css'
import React, { useRef, useState } from "react";
import { handleSubmit } from './api/handleSubmit';

export const FormLogin = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Estado para feedback da API (sucesso ou erro)
  const [apiMessage, setApiMessage] = useState('');

   // Estado para checkBox rememberSession
   const [rememberSession, setRememberSession ] = useState(false);

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false);

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false);

  const triggerErrorMessageShake = () => {
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => {
    setIsApiMessageShaking(true);
    setTimeout(() => setIsApiMessageShaking(false), 1000); // Duração da animação
  };  

  return(
      <div className='form-login'>
        <form className='form' onSubmit={(e) => handleSubmit(e, emailRef, passwordRef, setApiMessage, rememberSession, triggerApiMessageShake, triggerErrorMessageShake)}>
       {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Faça seu login</h1>
            <div className='email'>
              <input type="email" placeholder='*Email' name='email' id='login-email' ref={emailRef}></input>
              <span   className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>
            <div className='password'>
              <input type='password' placeholder='*Senha' name='password' id='login-password' ref={passwordRef}></input>
              <span   className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>
            <button type='submit'>Fazer login</button>
            <div className='rememberSession'>
              <input type="checkbox" name="rememberSession" id="rememberSession" onClick={() => setRememberSession(!rememberSession)}/>
              <label htmlFor="rememberSession">Lembre de mim</label>
            </div>
        </form>
      </div>
    )
}