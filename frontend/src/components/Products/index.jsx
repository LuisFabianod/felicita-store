import './styles.css';
import React, { useState, useContext } from 'react';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { loadProducts } from './api/loadProducts';
import { AdminProduct } from '../AdminProduct';
import { useFetchProductsEffect } from '../../hooks/useFetchProductsEffect';

export const Products = () => {
    const [apiMessage, setApiMessage] = useState('');
    const [products, setProducts] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

    useFetchProductsEffect(setIsLoading, loadProducts, setApiMessage, setProducts)

    return (
        <>
        {products.length === 0 && <h1 style={{textAlign: 'center'}}>Você não tem  produtos cadastrados</h1>}
        <div className='products-container'>
            {products.length > 0 ? (
                products.map((product) => (
                    <AdminProduct key={product.id} product={product} />
                ))
            ) : (
                <p>{apiMessage}</p>
            )}
        </div>
        </>
    );
};

