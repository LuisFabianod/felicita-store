import './styles.css'
import React, { useRef, useState } from "react";
import { handleSubmit } from './api/handleSubmit';

export const FormLogin = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [apiMessage, setApiMessage] = useState('');   // Estado para feedback da API (sucesso ou erro)

  const [rememberSession, setRememberSession ] = useState(false); // Estado para checkBox rememberSession

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