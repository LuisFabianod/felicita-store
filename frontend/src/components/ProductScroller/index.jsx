import React from "react";
import { register } from 'swiper/element/bundle';
import './styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { ProductPresentation } from "../ProductPresentation";

register();

export const ProductScroller = ({ products }) => {
    const BACK_END = process.env.REACT_APP_BACK_END;

    const handleClick = (e, product) => {
        const isAvailable = product.estoque !== 0;

        if (!isAvailable) e.preventDefault();
    }

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={20}
            pagination={false}
            navigation={true}
            loop={true}
        >
            {products.map((product, index) => (
                <SwiperSlide key={index}>
                    <Link to={`/product`} state={{product}} onClick={(e) => handleClick(e, product)} className='product-container'>
                        <ProductPresentation
                            product={product}
                            url={`${BACK_END}/images/products/${product.imagens}`}
                            isAvailable={product.estoque !== 0} 
                            productName={product.nome}
                        />

                        <h2 className='product-name'>{product.nome}</h2>
                        <p className='product-normal-price'>R${product.preco}</p>
                        {product.precoPromocional !== 0 && (
                            <p className='product-promo-price'>R${product.precoPromocional} com Pix</p>
                        )}



                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
