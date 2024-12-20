import React, { useContext } from 'react';
import { ProductRegister } from './sub-components/ProductRegister/index'
import { IsAdminContext } from '../../Contexts/IsAdmin';
import { IsLoadingContext } from '../../Contexts/isLoading';
import { LoadingSpinner } from '../Loading';

export const AdminInterface = () => {
    const {isAdmin } = useContext(IsAdminContext);
    const { isLoading } = useContext(IsLoadingContext);
    
    return (
        
        <>
         {isLoading && 
        <LoadingSpinner/>
       }  
        {!isAdmin && null}
        {isAdmin &&
        
        <>
        <ProductRegister/>
        </>
        
        }

        </>
    );
};
