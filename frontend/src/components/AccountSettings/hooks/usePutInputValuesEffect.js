import { useEffect } from 'react'

// Esse useEffect detecta se os inputs do formulário de edição já existem,
// se existirem, define seus valores como os dados atuais do usuário que estão salvos no localStorage
export const usePutInputValuesEffect =  (nomeRef, emailRef) => {
    useEffect(() => {
        if(nomeRef.current && emailRef.current){
            nomeRef.current.value = localStorage.getItem('userName');
            emailRef.current.value = localStorage.getItem('userEmail');
        }
      }, [nomeRef, emailRef])
}