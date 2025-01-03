import './styles.css'
import React, { useContext } from "react";
import { AccountSettings } from '../../components/AccountSettings';

import { IsLoadingContext } from '../../Contexts/IsLoading'
import { LoadingSpinner } from '../../components/Loading';

export const Account = () => {

    const { isLoading } = useContext(IsLoadingContext)

    return(
        <>
        {isLoading && 
        <LoadingSpinner/>
       }  


        <div className='account'>
            <AccountSettings/>
        </div>
        </>
    )
}