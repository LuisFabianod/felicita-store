import './styles.css'
import React, { useContext } from "react";
import { AccountRegisterForm } from '../../components/AccountRegisterForm';
import { LoginForm } from '../../components/LoginForm';

import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';


export const Auth = () => {

    const { isLoading } = useContext(IsLoadingContext)

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  

        <div className={'auth' }>    
            <LoginForm />
            <AccountRegisterForm/>

        </div>
          
       </>
    )
}