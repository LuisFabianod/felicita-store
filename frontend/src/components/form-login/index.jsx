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

    return(
      <div className='form-login'>
        <form method='POST' className='form' onSubmit={(e) => handleSubmit(e, emailRef, passwordRef, setApiMessage, rememberSession)}>
        {apiMessage && <div className="api-message">{apiMessage}</div>}
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
              <input type="checkbox" name="rememberSession" id="rememberSession" onClick={() => setRememberSession(!rememberSession)}/>
              <label htmlFor="rememberSession">Lembre de mim</label>
            </div>
        </form>
      </div>
    )
}