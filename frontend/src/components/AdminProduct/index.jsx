import './styles.css';
import { CarouselSlider } from '../CarouselSlider';
import React, { useState, useEffect, useContext } from 'react';
import { handleExclude } from './api/handleExclude';
import { IsLoadingContext } from '../../Contexts/IsLoading';

export const AdminProduct = ({ product }) => {
    const [images, setImages] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

    const handleClick = () => {
        const userWantsToDelete = window.confirm('Tem certeza que quer excluir o produto?');
   
         if(!userWantsToDelete) return

        handleExclude( product.id, setIsLoading)
    }

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
        <CarouselSlider images={images} url={`http://localhost:5000/images/products/${product.imagens}`} width={'300px'} maxHeight={'200px'}/>
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
            
            <button onClick={handleClick}>Excluir produto</button>
        </div>
        </>
    );
};
