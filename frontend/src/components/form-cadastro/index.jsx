import './styles.css'
import React, { useRef, useState} from "react";
import { handleSubmit } from './utils/handleSubmit';
import { PasswordChecks } from './sub-components/password-check';

export const FormCadastro = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
  const sobrenomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

  // Estado para feedback da API (sucesso ou erro)
  const [apiMessage, setApiMessage] = useState('');

  // Função para tratar o envio do formulário
  ; 

 return (
    <div className='form-cadastro'>
      <form method='POST' className='form' onSubmit={(e) => handleSubmit(e, nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref, setApiMessage)}>
        {apiMessage && <div className="api-message">{apiMessage}</div>}
        <h1>Faça seu cadastro</h1>
        <div className='nome-sobrenome'>
          <div className='nome'>
            <input type='text' placeholder='*Nome' name='nome' id='nome' ref={nomeRef}></input>
            <span className='error-message'></span>
          </div>
          <div className='sobrenome'>
            <input type='text' placeholder='*Sobrenome' name='sobrenome' id='sobrenome' ref={sobrenomeRef}></input>
            <span className='error-message'></span>
          </div>
        </div>
        <div className='email'>
          <input type="email" placeholder='*Email' name='email' id='email' ref={emailRef}></input>
          <span className='error-message'></span>
        </div>

        <div className='senha'>
          <div className='password'>
            <input type='password' placeholder='*Senha' name='password' id='password' ref={passwordRef}></input>
            <span className='error-message'></span>
          </div>
          <div className='password2'>
            <input type='password' placeholder='*Confirmar Senha' name='password2' id='password2' ref={password2Ref}></input>
            <span className='error-message'></span>
          </div>
        </div>
        <PasswordChecks passwordRef={passwordRef}/>

        <button type='submit' >Cadastrar</button>

      </form>

    </div>
  )
}