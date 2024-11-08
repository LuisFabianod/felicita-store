import './styles.css'
import React, {useRef} from "react";
import { checkForEmpty, removeErrorClass, checkEmail, checkEqualPasswords, shouldSubmit } from './utils/validation';

export const FormCadastro = () => {
  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
  const sobrenomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

    // SUBMIT FORM EVENTLISTENER
    const handleSubmit = (e) => {
      e.preventDefault();
      // CHAMADA DAS FUNÇÕES DE VALIDAÇÃO DO ARQUIVO validation.js
      removeErrorClass(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref);
      checkForEmpty(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref);
      checkEmail(emailRef);
      checkEqualPasswords(passwordRef, password2Ref);
      if(shouldSubmit(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref)){
        e.target.submit();
      }
    }

    return(
      <div className='form-cadastro'>
        <form method='POST' action="http://localhost:5000/cadastro/cadastrar-usuario" className='form' onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
            <div className='nome-sobrenome'>
              <div className='nome'>
                <input type='text' placeholder='*Nome' name='nome' id='nome'ref={nomeRef}></input>
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

            <button type='submit' >Cadastrar</button>
            <span className='error-message'></span>

        </form>

      </div>
    )
}