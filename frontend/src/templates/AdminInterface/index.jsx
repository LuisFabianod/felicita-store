import React, { useContext } from 'react';
import { ProductRegister } from '../../components/ProductRegister/index'
import { IsAdminContext } from '../../Contexts/IsAdmin';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';

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
