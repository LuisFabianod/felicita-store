import './styles.css';
import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CarouselSlider } from '../../components/CarouselSlider';
import { CollapsibleSection } from '../../components/CollapsibleSection';
import { FreightCalculator } from '../../components/FreightCalculator';
import { CartContext } from "../../Contexts/Cart";
import { useNotification } from '../../Contexts/Notification';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';

export const ProductPage = () => {

    const BACK_END = process.env.REACT_APP_BACK_END;


    const { state } = useLocation();
    const { product } = state || {}; // Desestruturação para garantir que 'product' seja acessível

    const [images, setImages] = useState([]);

    const { addToCart } = useContext(CartContext);
    
    const { showNotification } = useNotification();

    const handleBuy = async () => {
        addToCart(product);

        showNotification({
            title: 'Produto adicionado ao carrinho',
            src: `${BACK_END}/images/products/${product.imagens}/${images[0]}`,
            descript: product.nome

        })
    }

    useFetchImagesEffect(product, setImages);

    if (!product) {
        return <div>Produto não encontrado.</div>;
    }

    return (
        <>  
            
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
                            <CollapsibleSection title={'MEIOS DE PAGAMENTO'}>{/* Aqui vem algo como: product.meiosDePagamento.map((meio) => <p>{meio}</p>) */}</CollapsibleSection> 
                            <CollapsibleSection title={'MEIOS DE ENVIO'}><FreightCalculator/></CollapsibleSection>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};
