import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { ClientProduct } from '../../components/ClientProduct';
import { CartContext } from '../../Contexts/Cart';

import excludeIcon from '../../assets/images/x.png'
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { LoadingSpinner } from '../../components/Loading';

export const Cart = () => {

    const { cart, removeFromCart } = useContext(CartContext)
    const [cartProducts, setCartProducts] = useState([]);

    const { isLoading } = useContext(IsLoadingContext);

    const handleExclude = (productId) => {
        removeFromCart(productId);
    }

    useEffect(() => {
        setCartProducts(cart)
    }, [cart])

    return (
        <>

            {isLoading &&
                <LoadingSpinner />
            }


            <h2>Seu Carrinho</h2>
            {cartProducts.length === 0 ? (
                <p>Carrinho vazio</p>
            ) : (
                <div className='cart-container'>
                    {cartProducts.map((product) => (
                        <>
                            <img className='icon exclude-product-cart' src={excludeIcon} onClick={() => handleExclude(product.id)} alt='product-img'></img>
                            <ClientProduct
                                key={product.id}
                                product={product}
                                maxWidth={'235px'}
                                maxHeight={'310px'}
                                titleSize={'12px'}
                                descriptSize={'10px'}
                            />
                        </>
                    ))}
                </div>
            )}
        </>
    );
};
