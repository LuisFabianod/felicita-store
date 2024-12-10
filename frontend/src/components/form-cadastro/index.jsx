import './styles.css'
import React, { useEffect, useRef, useState} from "react";
import { handleSubmit } from './api/handleSubmit';
import { PasswordChecks } from './sub-components/password-check';
import { handleVerifyEmail } from './api/handleVerifyEmail';
import showPasswordIcon from '../../images/open-eye.png'
import hidePasswordIcon from '../../images/closed-eye.png'

export const FormCadastro = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);
  const sobrenomeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const verificationCodeRef = useRef(null)

  const [passwordIcon, setPasswordIcon ] = useState(hidePasswordIcon)

  const [showPassword, setShowPassword ] = useState('password')

  const [apiMessage, setApiMessage] = useState(''); // Estado para feedback da API (sucesso ou erro)

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // Estado para animação de erro mensagem dos inputs

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro mensagem da API

  const [verifyEmailDisplay, setVerifyEmailDisplay] = useState(false) // Estado para controlar a aparição do input verify-email

  const handleShowPasswordClick = () => {
    if(showPassword === 'password'){
      setShowPassword('text')
      setPasswordIcon(showPasswordIcon)
    }else{
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
    if(Array.from(apiMessage)[0] === 'V')
      setVerifyEmailDisplay(true)
  }, [apiMessage])

 return (
  
    <div className='form-cadastro'>
      <form  className='form' onSubmit={(e) => handleSubmit(e, nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>} 
        <h1>Faça seu cadastro</h1>
        <div className='nome-sobrenome'>
          <div className='nome'>
            <input type='text' placeholder='*Nome' name='nome' id='nome' ref={nomeRef} maxLength={120}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          <div className='sobrenome'>
            <input type='text' placeholder='*Sobrenome' name='sobrenome' id='sobrenome' ref={sobrenomeRef} maxLength={120}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='register-email'>
          <input type="email" placeholder='*Email' name='email' id='email' ref={emailRef}></input>
          <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>

          <div className='password'>
            <div className='password-input'>
              <input type={showPassword} placeholder='*Senha' name='password' id='password' ref={passwordRef}></input>
              <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{width: '20px', height: '20px', cursor: 'pointer'}}/>
            </div>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          <div className='password2'>
            <input type='password' placeholder='*Confirmar Senha' name='password2' id='password2' ref={password2Ref}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

        <PasswordChecks passwordRef={passwordRef}/>

       {verifyEmailDisplay && 
      <div className='verify-email'>
      <form className='form' >
      <input type="text" name="verificationCode" id="verificationCode" ref={verificationCodeRef}/>
      <button type='button' onClick={(e) => handleVerifyEmail(e, verificationCodeRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>Enviar</button>
      </form>
      </div>
       }
        
        

        <button type='submit'>Cadastrar</button>

      </form>

    </div>

  
  )
}