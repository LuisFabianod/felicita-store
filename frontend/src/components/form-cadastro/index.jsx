import './styles.css'
import React, { useRef, useState } from "react";
import { checkForEmpty, removeErrorClass, checkEmail, checkEqualPasswords, shouldSubmit, checkPassword } from './utils/validation';
import { nameFormatation } from './utils/nameFormatation';
import { usePasswordRestrictsEffect } from './hooks/usePasswordRestrictsEffect';
import circleImage from '../../images/circulo.png'


export const FormCadastro = () => {
  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
  const sobrenomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

  // DECLARAÇÃO DO ESTADO DAS IMAGENS DAS RESTRIÇÕES DA SENHA
  const [lowerCaseSrc, setLowerCaseSrc] = useState(circleImage);
  const [upperCaseSrc, setUpperCaseSrc] = useState(circleImage);
  const [numberSrc, setNumberSrc] = useState(circleImage);
  const [minDigitsSrc, setMinDigitsSrc] = useState(circleImage);

  // SUBMIT FORM EVENTLISTENER
  const handleSubmit = (e) => {
    e.preventDefault();
    // CHAMADA DAS FUNÇÕES DE VALIDAÇÃO DO ARQUIVO validation.js
    removeErrorClass(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref);
    checkEmail(emailRef);
    checkEqualPasswords(passwordRef, password2Ref);
    checkPassword(passwordRef);
    checkForEmpty(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref);
    if (shouldSubmit(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref)) {
      nameFormatation(nomeRef, sobrenomeRef);
      e.target.submit();
    }
  }

  usePasswordRestrictsEffect(passwordRef, setLowerCaseSrc, setUpperCaseSrc, setNumberSrc, setMinDigitsSrc)

  return (
    <div className='form-cadastro'>
      <form method='POST' action="http://localhost:5000/cadastro/cadastrar-usuario" className='form' onSubmit={handleSubmit}>
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

        <p className='password-requests'>Sua senha deve conter:</p>
        <div className='password-checks'>
          <div className='div-lowercase'>
            <img src={lowerCaseSrc} alt="check-icon" className='check-icon' />
            <p className='lowercase'>Letra minúscula</p>
          </div>

          <div className='div-uppercase'>
            <img src={upperCaseSrc} alt="check-icon" className='check-icon' />
            <p className='uppercase'>Letra maiúscula</p>
          </div>

          <div className='div-number'>
            <img src={numberSrc} alt="check-icon" className='check-icon'  />
            <p className='number'>Número</p>
          </div>

          <div className='div-min-digits'>
            <img src={minDigitsSrc} alt="check-icon" className='check-icon' />
            <p className='min-digits'>8 dígitos</p>
          </div>
        </div>

        <button type='submit' >Cadastrar</button>

      </form>

    </div>
  )
}