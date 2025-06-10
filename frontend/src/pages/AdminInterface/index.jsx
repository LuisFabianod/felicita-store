import './styles.css'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IsAdminContext } from '../../Contexts/IsAdmin';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';

export const AdminInterface = () => {
    const { isAdmin } = useContext(IsAdminContext);
    const { isLoading } = useContext(IsLoadingContext);

    return (

        <>
            {isLoading &&
                <LoadingSpinner />
            }
            {!isAdmin && null}
            {isAdmin &&

                <>
                    <div className='admin-interface' style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1>Interface Administradora</h1>
                        <div className='admin-menu'>
                            <Link to={'register-product'} className='admin-link-container'>
                                <p className='admin-link'>Adicionar produto</p>
                            </Link>
                            <Link to={'products'} className='admin-link-container'>
                                <p className='admin-link'>Meus produtos</p>
                            </Link>
                            <Link to={'layout-config'} className='admin-link-container'>
                                <p className='admin-link'>Configurações visuais</p>
                            </Link>
                            <Link to={'section-configuration'} className='admin-link-container'>
                                <p className='admin-link'>Seções</p>
                            </Link>
                        </div>
                    </div>
                </>

            }

        </>
    );
};
