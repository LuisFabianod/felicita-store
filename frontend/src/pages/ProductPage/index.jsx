import { CarouselSlider } from '../../components/CarouselSlider';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';
import './styles.css';
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Notification } from '../../components/Notification';
import { CartContext } from "../../Contexts/Cart";

export const ProductPage = () => {

    const { state } = useLocation();
    const { product } = state || {}; // Desestruturação para garantir que 'product' seja acessível

    const [images, setImages] = useState([]);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState(null);
    const [notificationImg, setNotificationImg] = useState(null);
    const [notificationDescript, setNotificationDescript] = useState(null);

    const { addToCart } = useContext(CartContext);
    

    const handleBuy = async () => {
        addToCart(product);
        setNotificationTitle('Produto adicionado ao carrinho');
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
                <Notification title={notificationTitle} src={notificationImg} descript={notificationDescript} onClose={() => setShowNotification(false)}/>
            }
            
            <div className='product-page-main'>

                <div className='product-page-images'>
                    <CarouselSlider images={images} url={`http://localhost:5000/images/products/${product.imagens}`} width={'50vw'} maxHeight={'100%'} />
                </div>

                <div className='product-page-info'>
                    <h2 className='product-page-name'>{product.nome}</h2>
                    <div className='product-page-price'>
                        <p className='product-page-normal-price'>R${product.preco}</p>
                        {product.precoPromocional !== 0 && (
                        <p className='product-page-promo-price'>R${product.precoPromocional} com Pix</p>
                    )}
                    </div>
                    

                    <hr />
                    <div className='purchase-section'>
                        <span>GUIA DE MEDIDAS</span>

                        <div className='add-to-cart-container'>
                            <button className='add-to-cart-button' onClick={handleBuy}>COMPRAR</button>
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
