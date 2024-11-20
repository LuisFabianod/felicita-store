import { useEffect } from 'react'

export const usePutInputValuesEffect =  (nomeRef, emailRef) => {
    useEffect(() => {
        if(nomeRef.current && emailRef.current){
            nomeRef.current.value = localStorage.getItem('userName');
            emailRef.current.value = localStorage.getItem('userEmail');
        }
      }, [nomeRef, emailRef])
}