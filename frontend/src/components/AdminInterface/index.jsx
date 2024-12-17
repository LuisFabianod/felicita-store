import React, { useContext } from 'react';
import { ProductRegister } from './sub-components/ProductRegister/index'
import { IsAdminContext } from '../../Contexts/IsAdmin';

export const AdminInterface = () => {
    const {isAdmin } = useContext(IsAdminContext);
    
    return (
        
        <>

        {!isAdmin && null}
        {isAdmin &&
        
        <>
        <ProductRegister/>
        </>
        
        }

        </>
    );
};
