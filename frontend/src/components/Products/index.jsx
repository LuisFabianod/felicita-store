import './styles.css';
import React, { useState, useContext, useEffect } from 'react';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { loadProducts } from './api/loadProducts';

export const Products = () => {
    const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor
    const [products, setProducts] = useState([]); // estado para os produtos

    const { setIsLoading } = useContext(IsLoadingContext);

    useEffect(() => {
        // Função assíncrona para carregar produtos
        const fetchProducts = async () => {
            setIsLoading(true); // Começa o carregamento
            await loadProducts(setIsLoading, setApiMessage, setProducts);
        };

        fetchProducts(); // Chama a função para buscar os produtos
    }, [setIsLoading]);

    return (
        <>
            <div className='register-product-form'>
                <h1>{apiMessage}</h1>
                {/* Exibindo os produtos */}
                {products && products.length > 0 ? (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <strong>{product.nome}</strong> - ${product.preco}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum produto encontrado</p>
                )}
            </div>
        </>
    );
};
