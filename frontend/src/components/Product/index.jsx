import { CarouselSlider } from '../CarouselSlider';
import './styles.css';
import React, { useState, useEffect } from 'react';

export const Product = ({ product }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`http://localhost:5000/product/images/${product.imagens}`, {
                method: 'GET',
               
            });

            if (response.ok) {
                const data = await response.json(); 
                setImages(data.imageNames)
            } else {
                console.error('Erro ao carregar as imagens', response);
            }
        };

        fetchImages();
    }, [product.imagens]);

    return (
        <>
        <CarouselSlider images={images} product={product}/>
        <div className='product-container'>
            <h2>{product.nome}</h2>
            <p className='description'>Descrição: {product.descricao}</p>
            <p className='normal-price'>Preço: {product.preco}</p>
            {product.precoPromocional !== 0 && (
                <p className='promo-price'>Preço promocional: {product.precoPromocional}</p>
            )}
            <p className='storage'>
                Estoque: {product.estoque !== -1 ? product.estoque : 'Infinito'}
            </p>

            
        </div>
        </>
    );
};
