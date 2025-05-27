import { useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/Loading';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { searchProducts } from './api/searchProducts'
import { ClientProduct } from '../../components/ClientProduct';

export const SearchProducts = () => {

    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('searchValue');

    const [products, setProducts] = useState([]);

    const [apiMessage, setApiMessage] = useState(null);

    const { isLoading, setIsLoading } = useContext(IsLoadingContext);

    useEffect(() => {
        if (searchValue) {
            searchProducts(searchValue, setProducts, setIsLoading, setApiMessage);
        }
    }, [searchValue, setIsLoading]);

    return (

        <>
            {isLoading &&
                <LoadingSpinner />
            }
            <p className='p-search'>Buscando por "{searchValue}"</p>
            <div className='client-products-container'>
            {products.length > 0 ? (
                products.map((product) => (
                    <ClientProduct key={product.id} product={product} maxWidth={'610px'} maxHeight={'80vh'} />
                ))
            ) : (
                <p>{apiMessage || `Nenhum produto encontrado para "${searchValue}"`}</p>
            )}
            </div>

        </>
    );
};
