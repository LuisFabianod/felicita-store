import './styles.css'
import React, { useContext } from "react";
import { LoginForm } from '../../components/LoginForm';

import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';


export const Login = () => {

    const { isLoading } = useContext(IsLoadingContext)

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  

        <div className={'login' }>    
            <LoginForm />

        </div>
          
       </>
    )
}