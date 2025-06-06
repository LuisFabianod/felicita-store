import './styles.css'
import React, { useContext } from "react";
import { AccountRegisterForm } from '../../components/AccountRegisterForm';

import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';


export const Register = () => {

    const { isLoading } = useContext(IsLoadingContext)

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  

        <div className={'register' }>    
            <AccountRegisterForm/>
        
        </div>
          
       </>
    )
}