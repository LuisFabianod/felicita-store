import './styles.css'
import React, { useRef } from "react";
import { checkForEmpty, removeErrorClass, checkEmail, shouldSubmit } from './utils/validation';

export const FormLogin = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

   // SUBMIT FORM EVENTLISTENER
   const handleSubmit = (e) => {
    e.preventDefault();
    // CHAMADA DAS FUNÇÕES DE VALIDAÇÃO DO ARQUIVO validation.js
    removeErrorClass( emailRef, passwordRef);
    checkForEmpty(emailRef, passwordRef);
    checkEmail(emailRef);
    if(shouldSubmit(emailRef, passwordRef)){
      e.target.submit();
    }
  }

    return(
      <div className='form-login'>
        <form method='POST' action="http://localhost:5000/login/login-usuario" className='form' onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
            <div className='email'>
              <input type="email" placeholder='*Email' name='email' id='login-email' ref={emailRef}></input>
              <span className='error-message'></span>
            </div>
            <div className='email'>
              <input type='password' placeholder='*Senha' name='password' id='login-password' ref={passwordRef}></input>
              <span className='error-message'></span>
            </div>
            <button type='submit'>Fazer login</button>

      
        </form>
      </div>
    )
}