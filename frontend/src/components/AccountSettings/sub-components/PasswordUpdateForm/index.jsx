import './styles.css'
import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'
import { PasswordChecks } from '../../../form-cadastro/sub-components/password-check';

import closeIcon from '../../../../images/x.png'

export const PasswordUpdateForm = ({passwordUpdateFormDisplay, setPasswordUpdateFormDisplay}) => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const newPasswordRef = useRef(null);
  const newPassword2Ref = useRef(null);
  const passwordRef = useRef(null);

  const [apiMessage, setApiMessage] = useState('');

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false);

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false);

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
            <input type='password' placeholder='*Nova senha' name='password' id='password' ref={newPasswordRef}></input>
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
          <div className='password-update-input'>
            <input type='password' placeholder='*Senha atual' name='actualPassword' id='actualPassword' ref={passwordRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>

        <button onSubmit={handleSubmit}>Salvar alterações</button>

      </form>

    </div>
    </dialog>
  )
}