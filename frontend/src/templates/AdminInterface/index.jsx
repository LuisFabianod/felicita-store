import './styles.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <div className='admin-interface'>
            <h1>Interface Administradora</h1>
            <Link to={'register-product'}>Registrar novo produto</Link>
        </div>
        </>
        
        }

        </>
    );
};
