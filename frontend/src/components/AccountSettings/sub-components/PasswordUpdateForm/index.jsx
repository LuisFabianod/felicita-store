import './styles.css'
import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'
import { PasswordChecks } from '../../../form-cadastro/sub-components/password-check';

import closeIcon from '../../../../images/x.png'
import showPasswordIcon from '../../../../images/open-eye.png'
import hidePasswordIcon from '../../../../images/closed-eye.png'


export const PasswordUpdateForm = ({passwordUpdateFormDisplay, setPasswordUpdateFormDisplay}) => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const newPasswordRef = useRef(null);
  const newPassword2Ref = useRef(null);
  const passwordRef = useRef(null);
  
  const [passwordIcon, setPasswordIcon ] = useState(hidePasswordIcon)
  
  const [showPassword, setShowPassword ] = useState('password')

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // estado para controle da animação de erro da span erro

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message

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
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

 return (
    <dialog className='secure-update-form'style={{display: passwordUpdateFormDisplay}}>
     <div className='form-update'>
    
      <form  className='form' onSubmit={(e) => handleSubmit(e, newPasswordRef, newPassword2Ref, passwordRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <div className='div-close-icon'>
        <img src={closeIcon} alt="close-icon" className='close-form-icon' onClick={() => setPasswordUpdateFormDisplay('none')}/>
        </div>
        <h1>Alterar Senha</h1>
        <div className='update-password'>
          <div className='password'>
            <input type={showPassword} placeholder='*Nova senha' name='password'  ref={newPasswordRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <div className='update-password'>
          <div className='password'>
            <input type='password' placeholder='*Repita a nova senha' name='password2' id='password2' ref={newPassword2Ref}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>
        <PasswordChecks passwordRef={newPasswordRef}/>
        <div className='update-password'>
            <div className='password-input'>
              <input type={showPassword} placeholder='*Sua senha' name='password' id='password' ref={passwordRef}></input>
              <img src={passwordIcon} alt="" onClick={handleShowPasswordClick} style={{width: '20px', height: '20px', cursor: 'pointer'}}/>
            </div>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

        <button type='submit'>Salvar alterações</button>

      </form>

    </div>
    </dialog>
  )
}