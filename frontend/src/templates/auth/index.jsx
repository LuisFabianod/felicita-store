import './styles.css'
import React from "react";
import { FormCadastro } from '../../components/form-cadastro';
import { FormLogin } from '../../components/form-login';


export const Auth = () => {

    return(
        <div className='auth'>
            <FormLogin/>
            <FormCadastro/>
        </div>

    )
}