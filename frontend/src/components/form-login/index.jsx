import './styles.css'
import React, { useRef } from "react";
import { shouldSubmit } from './utils/validation';

export const FormLogin = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

   // SUBMIT FORM EVENTLISTENER
   const handleSubmit = (e) => {
    e.preventDefault(); // impede o envio do formulário
    if(shouldSubmit(emailRef, passwordRef)){ // a função shoulSubmit faz todas as validações do arquivo validation.js e retorna boolean
      e.target.submit(); // caso should submit retorne true, envia o formulário
    }
  }

    return(
      <div className='form-login'>
        <form method='POST' action="http://localhost:5000/login/login-user" className='form' onSubmit={handleSubmit}>
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
            <div className='rememberSession'>
              <input type="checkbox" name="rememberSession" id="rememberSession" />
              <label htmlFor="rememberSession">Lembre de mim</label>
            </div>

      
        </form>
      </div>
    )
}