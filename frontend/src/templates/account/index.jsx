import './styles.css'
import React from "react";
import { Header } from '../../components/Header';
import { AccountSettings } from '../../components/AccountSettings';


export const Account = () => {

    return(
        <>
        <Header></Header>
        <div className='account'>
            <AccountSettings/>
        </div>
        </>
    )
}