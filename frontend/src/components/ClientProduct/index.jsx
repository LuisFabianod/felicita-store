import { ProductPresentation } from '../ProductPresentation';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ClientProduct = ({ product }) => {
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
            <Link to={`/product`} state={{ product }} className='product-container'>
                <ProductPresentation
                    images={images}
                    url={`http://localhost:5000/images/products/${product.imagens}`}
                    maxWidth={'610px'}
                    maxHeight={'80vh'}
                    isAvailable={product.estoque !== 0} // If the product is available it sends true
                />

                <h2 className='product-name'>{product.nome}</h2>
                <p className='product-normal-price'>R${product.preco}</p>
                {product.precoPromocional !== 0 && (
                    <p className='product-promo-price'>R${product.precoPromocional} com Pix</p>
                )}



            </Link>
        </>
    );
};
