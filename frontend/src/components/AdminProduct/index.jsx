import './styles.css';
import { CarouselSlider } from '../CarouselSlider';
import React, { useState, useContext, useRef } from 'react';
import { handleExclude } from './api/handleExclude';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';
import { useNotification } from '../../Contexts/Notification';

export const AdminProduct = ({ product }) => {
    const BACK_END = process.env.REACT_APP_BACK_END;

    const [ normalDisplay, setNormalDisplay ] = useState('block');
    const [ editDisplay, setEditDisplay ] = useState('none');

    const nomeProdutoRef = useRef(null);
    const descricaoProdutoRef = useRef(null);
    const secaoProdutoRef = useRef(null);
    const precoProdutoRef = useRef(null);
    const precoPromocionalRef = useRef(null);
    const estoqueProdutoRef = useRef(null);

    const [images, setImages] = useState([]);

    const { setIsLoading } = useContext(IsLoadingContext);

      const { showNotification } = useNotification();

    const handleSubmit = async () => {
        const userWantsToDelete = window.confirm('Tem certeza que quer excluir o produto?');

        if (!userWantsToDelete) return

        const result = await handleExclude(product.id, setIsLoading);

         showNotification({
                title: result,
                src: `${BACK_END}/images/products/${product.imagens}/${images[0]}`,
                descript: 'Recarregue a página.',
              })
    }

    const handleEdit = async () => {
        if(editDisplay === 'flex'){
            setEditDisplay('none');
            setNormalDisplay('block');
        }else{
            setEditDisplay('flex');
            setNormalDisplay('none');
        }
    }

    const handleSubmitEdit = async () => {
    
    }

    useFetchImagesEffect(product, setImages)

    return (
        <>
        <div className='admin-product-container' >
            <CarouselSlider images={images} url={`${BACK_END}/images/products/${product.imagens}`} width={'300px'} maxHeight={'600px'} />
            <div className='admin-product-info' style={{display: normalDisplay}}>
                <h2>{product.nome}</h2>
                <p className='admin-description'>Descrição: {product.descricao}</p>
                <p className='admin-normal-price'>Preço: {product.preco}</p>
                {product.precoPromocional !== 0 && (
                    <p className='admin-promo-price'>Preço promocional: {product.precoPromocional}</p>
                )}
                <p className='admin-section'>Seção: {product.secao}</p>
                <p className='storage'>
                    Estoque: {product.estoque !== -1 ? product.estoque : 'Infinito'}
                </p>

                <button onClick={handleSubmit}>Excluir produto</button>
                <button onClick={handleEdit}>Editar produto</button>
            </div>

            <div className='admin-product-edit' style={{display: editDisplay}}>
                <div className='edit-product-input'>
                    <label htmlFor="">Nome:</label>
                    <input type='text' value={product.nome} ref={nomeProdutoRef}></input>
                </div>
                <div className='edit-product-input'>
                    <label htmlFor="">Descrição:</label>
                    <input type='text' value={product.descricao} className='admin-description' ref={descricaoProdutoRef}></input>
                </div>
                <div className='edit-product-input'>
                    <label htmlFor="">Preço:</label>
                    <input type='number' className='admin-normal-price' value={product.preco} ref={precoProdutoRef}></input>
                </div>
                {product.precoPromocional !== 0 && (
                    <div className='edit-product-input'>
                        <label htmlFor="">Preço promocional:</label>
                        <input type='number' className='admin-promo-price' value={product.precoPromocional} ref={precoPromocionalRef}></input>
                    </div>
                )}
                <div className='edit-product-input'>
                    <label htmlFor="">Seção:</label>
                    <input type='text' value={product.secao} ref={secaoProdutoRef}></input>
                </div>
                <div className='edit-product-input'>
                    <label htmlFor="">Estoque:</label>
                    <input className='storage' type='text' value={product.estoque} ref={estoqueProdutoRef}></input>
                </div>
                <p>Se estoque estiver -1 quer dizer infinito</p>

                <button onClick={handleSubmitEdit}>Enviar Alterações</button>
                <button onClick={handleEdit}>Sair de modo edição</button>
            </div>
        </div>
        </>
    );
};
