import './styles.css'
import React, { useRef, useState} from 'react'
import { handleSubmit } from './api/handleSubmit'
import { handleDelete } from './api/handleDelete'
import { usePutInputValuesEffect } from './hooks/usePutInputValuesEffect'

import { EmailUpdateForm } from './sub-components/EmailUpdateForm'
import { PasswordUpdateForm } from './sub-components/PasswordUpdateForm'

export const AccountSettings = () => {

   // DECLARAÇÃO DOS FIELDS(INPUTS) 
  const nomeRef = useRef(null);

  const [ emailUpdateFormDisplay, setEmailUpdateFormDisplay] = useState('none')
  const [ passwordUpdateFormDisplay, setPasswordUpdateFormDisplay] = useState('none')

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
 
  usePutInputValuesEffect(nomeRef);   

  const confirmDelete = () => {
   const userWantsToDelete = window.confirm('Tem certeza que quer excluir sua conta?');
   
   if(!userWantsToDelete) return

   handleDelete(setApiMessage, triggerApiMessageShake);

  }

 return (
    <>
    <div className='form-update'>
    
      <form  className='form' onSubmit={(e) => handleSubmit(e, nomeRef , setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Meus Dados</h1>
        <div>
        <button type='button' onClick={() => setEmailUpdateFormDisplay('flex')}>Alterar e-mail</button> <button type='button' onClick={() => setPasswordUpdateFormDisplay('flex')}>Alterar senha</button>
        </div>
        <div className='update-nome'>
          <div className='nome'>
            <input type='text' placeholder='*Nome completo' name='nome' id='nome' ref={nomeRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
        </div>

        <button onSubmit={handleSubmit}>Salvar alterações</button>
        <button type='button' onClick={confirmDelete}>Excluir minha conta</button>

      </form>

    </div>
    <EmailUpdateForm emailUpdateFormDisplay={emailUpdateFormDisplay} setEmailUpdateFormDisplay={setEmailUpdateFormDisplay}/>
    <PasswordUpdateForm passwordUpdateFormDisplay={passwordUpdateFormDisplay} setPasswordUpdateFormDisplay={setPasswordUpdateFormDisplay}/>
    </>
  )
}