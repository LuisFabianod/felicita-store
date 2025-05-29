import { ProductPresentation } from '../ProductPresentation';
import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const ClientProduct = ({ product, maxWidth, maxHeight, titleSize}) => {

    const BACK_END = process.env.REACT_APP_BACK_END;

    const handleClick = (e) => {
        const isAvailable = product.estoque !== 0;
        
        if(!isAvailable) e.preventDefault();
    }

    return (
        <>
            <Link to={`/product`} state={{ product }} onClick={handleClick} className='product-container'>
                <ProductPresentation
                    product={product}
                    url={`${BACK_END}/images/products/${product.imagens}`}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    isAvailable={product.estoque !== 0} // If the product is available it sends true
                    productName={product.nome}
                />

                <h2 className='product-name' style={{fontSize: titleSize}}>{product.nome}</h2>
                <p className='product-normal-price'>R${product.preco}</p>
                {product.precoPromocional !== 0 && (
                    <p className='product-promo-price'>R${product.precoPromocional} com Pix</p>
                )}



            </Link>
        </>
    );
};
