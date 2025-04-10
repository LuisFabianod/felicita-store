import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingSpinner } from '../../components/Loading';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { loadFavorites } from './api/loadFavorites';
import { ClientProduct } from '../../components/ClientProduct';


export const FavoriteProducts = () => {

    const [ favorites, setFavorites ] = useState([]);
    const [ apiMessage, setApiMessage ] = useState(null);

    const { isLoading, setIsLoading } = useContext(IsLoadingContext);

    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        loadFavorites(userEmail, setIsLoading, setFavorites, setApiMessage);
    }, [setIsLoading, userEmail])

    return (
        
        <>  
        {isLoading && 
            <LoadingSpinner/>
            }     

        <div className='favorite-products-container'>
            <h1>{'Meus Favoritos'}</h1>
                <hr style={{width: '80%', margin: '30px 0px'}}/>
                    {favorites.length > 0 ? (
                        favorites.map((favoriteProduct) => (
                            <ClientProduct key={favoriteProduct.id} 
                            product={favoriteProduct} 
                            maxWidth={'235px'} 
                            maxHeight={'310px'}
                            titleSize={'14px'}
                            descriptSize={'10px'}
                            />
                        ))
                    ) : (
                        <p>{apiMessage}</p>
                    )}
                </div>
        </>
    );
};
