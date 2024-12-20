import './styles.css'
import React, { useContext } from "react";
import { FormCadastro } from '../../components/form-cadastro';
import { FormLogin } from '../../components/form-login';

import { IsLoadingContext } from '../../Contexts/isLoading';
import { LoadingSpinner } from '../../components/Loading';


export const Auth = () => {

    const { isLoading } = useContext(IsLoadingContext)

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  

        <div className={'auth' }>    
            <FormLogin/>
            <FormCadastro/>

        </div>
          
       </>
    )
}