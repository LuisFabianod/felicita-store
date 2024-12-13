import './styles.css'
import React from "react";
import { FormCadastro } from '../../components/form-cadastro';
import { FormLogin } from '../../components/form-login';
import { Header } from '../../components/Header'


export const Auth = () => {

    return(
        <>
        <Header/>
        <div className='auth'>
            
            <FormLogin/>
            <FormCadastro/>
        </div>
        </>
    )
}