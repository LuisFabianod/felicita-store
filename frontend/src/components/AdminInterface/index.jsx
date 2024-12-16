import React, { useState } from 'react';
import { Header } from '../Header';
import { ProductRegister } from './sub-components/ProductRegister/index'

export const AdminInterface = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const getIsAdmin = (isAdminHeader) => {
        setIsAdmin(isAdminHeader);
    };

    return (
        
        <>
        {!isAdmin && null}
        {isAdmin &&
        <>
        <Header getIsAdmin={getIsAdmin} />
        <ProductRegister/>
        </>
        }

            
            
        </>
    );
};
