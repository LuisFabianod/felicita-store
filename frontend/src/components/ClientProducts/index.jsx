import './styles.css';
import React, { useState, useContext, useEffect } from 'react';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { loadProducts } from './api/loadProducts';
import { ClientProduct } from '../ClientProduct';

export const ClientProducts = () => {
    const [apiMessage, setApiMessage] = useState('');
    const [products, setProducts] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

    useEffect(() => {
        // Função assíncrona para carregar produtos
        const fetchProducts = async () => {
            setIsLoading(true); // Começa o carregamento
            await loadProducts(setIsLoading, setApiMessage, setProducts);
        };

        fetchProducts();
    }, [setIsLoading]);

    return (
        <div className='client-products-container'>
            {products.length > 0 ? (
                products.map((product) => (
                    <ClientProduct key={product.id} product={product} />
                ))
            ) : (
                <p>{apiMessage}</p>
            )}
        </div>
    );
};

