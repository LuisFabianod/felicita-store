import { CarouselSlider } from '../CarouselSlider';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ProductPage = () => {

    const { state } = useLocation();
    const { product } = state || {}; // Desestruturação para garantir que 'product' seja acessível

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!product || !product.imagens) return; // Verifica se product e product.imagens existem

        const fetchImages = async () => {
            const response = await fetch(`http://localhost:5000/product/images/${product.imagens}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setImages(data.imageNames);
            } else {
                console.error('Erro ao carregar as imagens', response);
            }
        };

        fetchImages();
    }, [product?.imagens, product]);

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <>
            <CarouselSlider images={images} url={`http://localhost:5000/images/products/${product.imagens}`} width={'300px'} maxHeight={'60vh'} />
        
            <h2 className='product-name'>{product.nome}</h2>
            <p className='product-description'>Descrição: {product.descricao}</p>
            <p className='product-normal-price'>Preço: {product.preco}</p>
            {product.precoPromocional !== 0 && (
                <p className='product-promo-price'>Preço promocional: {product.precoPromocional}</p>
            )}
            <p className='product-storage'>
                Estoque: {product.estoque !== -1 ? product.estoque : 'Infinito'}
            </p>
        </>
    );
};
