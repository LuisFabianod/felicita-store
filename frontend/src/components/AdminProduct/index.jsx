import './styles.css';
import { CarouselSlider } from '../CarouselSlider';
import React, { useState, useContext } from 'react';
import { handleExclude } from './api/handleExclude';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';
import { Notification } from '../Notification';

export const AdminProduct = ({ product }) => {
    const [images, setImages] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState(null);
    const [notificationImg, setNotificationImg] = useState(null);
    const [notificationDescript, setNotificationDescript] = useState(null);


    const handleClick = () => {
        const userWantsToDelete = window.confirm('Tem certeza que quer excluir o produto?');

        if (!userWantsToDelete) return

        handleExclude(product.id, setIsLoading, setNotificationTitle);
        setShowNotification(true);
        setNotificationDescript(product.nome);
        setNotificationImg(`http://localhost:5000/images/products/${product.imagens}/${images[0]}`);
    }

    useFetchImagesEffect(product, setImages)

    return (
        <>
        {showNotification && 
        <Notification title={notificationTitle} src={notificationImg} descript={notificationDescript} onClose={() => setShowNotification(false)}/>
        }
        <div className='admin-product-container'>
            <CarouselSlider images={images} url={`http://localhost:5000/images/products/${product.imagens}`} width={'300px'} maxHeight={'600px'} />
            <div className='admin-product-info'>
                <h2>{product.nome}</h2>
                <p className='admin-description'>Descrição: {product.descricao}</p>
                <p className='admin-normal-price'>Preço: {product.preco}</p>
                {product.precoPromocional !== 0 && (
                    <p className='admin-promo-price'>Preço promocional: {product.precoPromocional}</p>
                )}
                <p className='storage'>
                    Estoque: {product.estoque !== -1 ? product.estoque : 'Infinito'}
                </p>

                <button onClick={handleClick}>Excluir produto</button>
                <button >Editar produto</button>
            </div>
        </div>
        </>
    );
};
