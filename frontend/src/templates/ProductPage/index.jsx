import { CarouselSlider } from '../../components/CarouselSlider';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';
import './styles.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Notification } from '../../components/Notification';

export const ProductPage = () => {

    const { state } = useLocation();
    const { product } = state || {}; // Desestruturação para garantir que 'product' seja acessível

    const [images, setImages] = useState([]);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationImg, setNotificationImg] = useState(null);
    const [notificationDescript, setNotificationDescript] = useState(null);


    const handleClick = () => {
        setShowNotification(true);
        setNotificationDescript(product.nome);
        setNotificationImg(`http://localhost:5000/images/products/${product.imagens}/${images[0]}`);
    }

    useFetchImagesEffect(product, setImages);


    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <>  
            {showNotification && 
                <Notification title={'Produto adicionado ao carrinho'} src={notificationImg} descript={notificationDescript} onClose={() => setShowNotification(false)}/>
            }
            
            <div className='product-page-main'>

                <div className='product-page-images'>
                    <CarouselSlider images={images} url={`http://localhost:5000/images/products/${product.imagens}`} width={'1000px'} maxHeight={'1300px'} />
                    <p className='product-page-description'>{product.descricao}</p>
                </div>

                <div className='product-page-info'>
                    <h2 className='product-page-name'>{product.nome}</h2>
                    <div className='product-page-price'>
                        <p className='product-page-normal-price'>R${product.preco}</p>
                        <p>Provisório 4x R$25,00 sem juros</p>

                    </div>
                    {product.precoPromocional !== 0 && (
                        <p className='product-page-promo-price'>R${product.precoPromocional} com Pix</p>
                    )}

                    <hr />
                    <div className='purchase-section'>
                        <span>GUIA DE MEDIDAS</span>

                        <div className='add-to-cart-container' onClick={handleClick}>
                            <button className='add-to-cart-button'>COMPRAR</button>
                        </div>

                        <div className='purchase-info'>
                            <span>MEIOS DE PAGAMENTO</span>
                            <span>MEIOS DE ENVIO</span>
                            <span>NOSSA LOJA</span>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};
