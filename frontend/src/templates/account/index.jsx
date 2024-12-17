import './styles.css'
import React from "react";
import { AccountSettings } from '../../components/AccountSettings';


export const Account = () => {

    return(
        <>
        <div className='account'>
            <AccountSettings/>
        </div>
        </>
    )
}