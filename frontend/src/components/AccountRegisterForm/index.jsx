import './styles.css'
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { handleSubmit } from './api/handleSubmit';
import { PasswordChecks } from './sub-components/password-check';
import { handleVerifyEmail } from './api/handleVerifyEmail';
import showPasswordIcon from '../../assets/images/open-eye.png'
import hidePasswordIcon from '../../assets/images/closed-eye.png'
import { IsLoadingContext } from '../../Contexts/IsLoading';

export const AccountRegisterForm = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
  const sobrenomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const verificationCodeRef = useRef(null)

  const [termsCheck, setTermsCheck] = useState(false); // Estado para checkBox rememberSession

  const [passwordIcon, setPasswordIcon] = useState(hidePasswordIcon)

  const [showPassword, setShowPassword] = useState('password')

  const [apiMessage, setApiMessage] = useState(''); // Estado para feedback da API (sucesso ou erro)

  const { setIsLoading } = useContext(IsLoadingContext)

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // Estado para animação de erro mensagem dos inputs

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro mensagem da API

  const [verifyEmailDisplay, setVerifyEmailDisplay] = useState(false) // Estado para controlar a aparição do input verify-email

  const handleShowPasswordClick = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
      setPasswordIcon(showPasswordIcon)
    } else {
      setShowPassword('password')
      setPasswordIcon(hidePasswordIcon)
    }
  }

  const triggerErrorMessageShake = () => { // ativa a animação de erro nos inputs 
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setIsApiMessageShaking(true);
    setTimeout(() => setIsApiMessageShaking(false), 1000); // Duração da animação

  };

  useEffect(() => { // se a api responde à requisição de verificação de e-mail com sucesso, o input do código de verificação aparece
    if (Array.from(apiMessage)[0] === 'V')
      setVerifyEmailDisplay(true)
  }, [apiMessage])

  return (
    <>
    <div className='form-cadastro'>
      <form className='form' onSubmit={(e) => handleVerifyEmail(e, nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref, termsCheck, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading)}>
        {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Faça seu cadastro</h1>
        <div className='nome-sobrenome'>
          <div className='nome'>
            <input type='text' placeholder='*Nome' name='nome' id='nome' ref={nomeRef} maxLength={120}></input>
            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          <div className='sobrenome'>
            <input type='text' placeholder='*Sobrenome' name='sobrenome' id='sobrenome' ref={sobrenomeRef} maxLength={120}></input>
            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='email'>
          <input type="email" placeholder='*Email' name='email' id='email' ref={emailRef}></input>
          <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>

        <div className='password'>
          <input type={showPassword} placeholder='*Senha' name='password' id='password' ref={passwordRef}></input>
          <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
          <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>

        <div className='password2'>
          <input type='password' placeholder='*Confirmar Senha' name='password2' id='password2' ref={password2Ref}></input>
          <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>
        <div className='terms-check'>
          <input type="checkbox" name="terms-check" id="terms-check" onClick={() => setTermsCheck(!termsCheck)} />
          <label htmlFor="terms-check">Li e aceito os <Link target="_blank" rel="noopener noreferrer" to={'/terms'} >Termos de uso</Link> e as <Link target="_blank" rel="noopener noreferrer" to={'/privacy-politics'}>Políticas de Privacidade</Link></label>
        </div>


        <PasswordChecks passwordRef={passwordRef} />

        {verifyEmailDisplay &&
          <div className='verify-email'>
            <form className='form' >
              <input type="text" name="verificationCode" id="verificationCode" ref={verificationCodeRef} />
              <button type='button' onClick={(e) => handleSubmit(e, verificationCodeRef, setApiMessage, triggerApiMessageShake, setIsLoading)}>Enviar</button>
            </form>
          </div>
        }



        <button type='submit'>Cadastrar</button>

      </form>

    </div>
    </>

  )
}