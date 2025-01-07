import './styles.css'
import React, { useContext, useRef, useState } from "react";
import { handleSubmit } from './api/handleSubmit';

import { PasswordChecks } from '../PasswordChecks'

import showPasswordIcon from '../../assets/images/open-eye.png'
import hidePasswordIcon from '../../assets/images/closed-eye.png'
import { IsLoadingContext } from '../../Contexts/IsLoading';

const params = new URLSearchParams(window.location.search);
export const ResetPassword = () => {

  // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const passwordRef = useRef(null);  
  const password2Ref = useRef(null);

  const token = params.get('token')

   
  const [passwordIcon, setPasswordIcon ] = useState(hidePasswordIcon)

  const [showPassword, setShowPassword ] = useState('password')

  const [apiMessage, setApiMessage] = useState('');   // Estado para feedback da API (sucesso ou erro)

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // Estado para animação de erro mensagem dos inputs

  const [isApiMessageShaking, setIsApiMessageShaking] = useState(false); // Estado para animação de erro da div api-message

  const { setIsLoading } = useContext(IsLoadingContext);

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

  return(
    <>
    <div className='reset-password-div'>
      <div className='form-cadastro'>
        <form className='form' onSubmit={(e) => handleSubmit(e, token , passwordRef, password2Ref, setApiMessage,  triggerApiMessageShake, triggerErrorMessageShake, setIsLoading)}>
       {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Restaurar senha</h1>
        <div className='password'>
            <div className='password-input'>
              <input type={showPassword} placeholder='*Senha' name='password' id='password' ref={passwordRef}></input>
              <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{ width: '20px', height: '20px' , cursor: 'pointer'}} />
            </div>
            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
            <div className='password'>
              <input type='password' placeholder='*Confirmar senha' name='password2' ref={password2Ref}></input>
              <span   className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>
            <button type='submit'>Alterar senha</button>
            <PasswordChecks passwordRef={passwordRef}/>
        </form>
      </div>
      </div>
    </>  
  )
}