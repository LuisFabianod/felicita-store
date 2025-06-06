import './styles.css'
import React, { useContext, useRef, useState } from "react";
import { handleSubmit } from './api/handleSubmit';
import { ResetPasswordRequest } from './sub-component/ResetPasswordRequest';
import showPasswordIcon from '../../assets/images/open-eye.png'
import hidePasswordIcon from '../../assets/images/closed-eye.png'
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { Link } from 'react-router-dom';

export const LoginForm = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const [passwordIcon, setPasswordIcon] = useState(hidePasswordIcon)

  const [showPassword, setShowPassword] = useState('password')

  const [resetPasswordDisplay, setResetPasswordDisplay] = useState('none') // estado para controle do dialog de update de email

  const [apiMessage, setApiMessage] = useState('');   // Estado para feedback da API (sucesso ou erro)

  const { setIsLoading } = useContext(IsLoadingContext);

  const [rememberSession, setRememberSession] = useState(false); // Estado para checkBox rememberSession

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // Estado para animação de erro mensagem dos inputs

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro da div api-message

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

  return (
    <>
      <div className='form-login'>
        <form className='form' onSubmit={(e) => handleSubmit(e, emailRef, passwordRef, setApiMessage, rememberSession, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading)}>
          {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
          <h1>Faça seu login</h1>
          <div className='email'>
            <input type="email" placeholder='*Email' name='email' id='login-email' ref={emailRef}></input>
            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          <div className='password'>
            <input type={showPassword} placeholder='*Senha' name='password' id='password' ref={passwordRef}></input>
            <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          <button type='submit'>Fazer login</button>
          <div className='rememberSession'>
            <input type="checkbox" name="rememberSession" id="rememberSession" onClick={() => setRememberSession(!rememberSession)} />
            <label htmlFor="rememberSession">Lembre de mim</label>
          </div>
          <p className='forgot-my-password' onClick={() => setResetPasswordDisplay('flex')}>Esqueci minha senha</p>
          <p className='register-p'>Novo na Felicita? <Link className='register-link' to={'/register'}>CADASTRE-SE</Link></p>
        </form>
      </div>
      <ResetPasswordRequest resetPasswordDisplay={resetPasswordDisplay} setResetPasswordDisplay={setResetPasswordDisplay} />
    </>
  )
}