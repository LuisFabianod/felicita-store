import './styles.css';
import { CarouselSlider } from '../CarouselSlider';
import React, { useState, useContext } from 'react';
import { handleExclude } from './api/handleExclude';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';
import { useNotification } from '../../Contexts/Notification';

export const AdminProduct = ({ product }) => {
    const BACK_END = process.env.REACT_APP_BACK_END;

    const [images, setImages] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

      const { showNotification } = useNotification();

    const handleClick = async () => {
        const userWantsToDelete = window.confirm('Tem certeza que quer excluir o produto?');

        if (!userWantsToDelete) return

        const result = await handleExclude(product.id, setIsLoading);

         showNotification({
                title: result,
                src: `${BACK_END}/images/products/${product.imagens}/${images[0]}`,
                descript: 'Recarregue a página.',
              })
    }

    useFetchImagesEffect(product, setImages)

    return (
        <>
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
