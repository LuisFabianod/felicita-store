import './styles.css';
import React, { useState, useContext, } from 'react';
import { loadProducts } from './api/loadProducts';
import { ClientProduct } from '../ClientProduct';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { useFetchProductsEffect } from '../../hooks/useFetchProductsEffect';

export const ClientProducts = () => {
    const [apiMessage, setApiMessage] = useState('');
    const [products, setProducts] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

    useFetchProductsEffect(setIsLoading, loadProducts, setApiMessage, setProducts)

    return (
        <div className='client-products-container'>
            {products.length > 0 ? (
                products.map((product) => (
                    <ClientProduct key={product.id} product={product} maxWidth={'610px'} maxHeight={'80vh'} />
                ))
            ) : (
                <p>{apiMessage}</p>
            )}
        </div>
    );
};