import './styles.css';
import React, { useContext, useRef, useState } from 'react';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';

import heartIcon from '../../assets/images/heart.png'
import { IsLoggedInContext } from '../../Contexts/IsLoggedIn';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { addFavorite } from './api/addFavorite';
import { Link } from 'react-router-dom';

import { useNotification } from '../../Contexts/Notification';


export const ProductPresentation = ({ product, url, width, isAvailable, productName }) => {

  const BACK_END = process.env.REACT_APP_BACK_END;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [images, setImages] = useState([])

  const favoriteIconRef = useRef(null);

  const { showNotification } = useNotification();

  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { setIsLoading } = useContext(IsLoadingContext);

  const userEmail = localStorage.getItem('userEmail');

  useFetchImagesEffect(product, setImages);

  const handleMouseEnter = () => {

    if (images.length > 1) setCurrentIndex(1);
    if (favoriteIconRef) {
      favoriteIconRef.current.style.display = 'inline-block'
    }

    return
  }

  const handleMouseLeave = () => {

    setCurrentIndex(0)
    if (favoriteIconRef) {
      favoriteIconRef.current.style.display = 'none'
    }

    return
  }

  const handleClick = async (e, productId) => {
    e.preventDefault();

    if(!isLoggedIn){
      showNotification({
        title: 'Para favoritar um produto, entre em sua conta.',
        src: `${BACK_END}/images/products/${product.imagens}/${images[0]}`,
        descript: <><Link to={'/auth'}>Clique aqui para entrar em sua conta</Link></>,
      })
      return;
    }

    const result = await addFavorite(productId, userEmail,setIsLoading);

    showNotification({
      title: result,
      src: `${BACK_END}/images/products/${product.imagens}/${images[0]}`,
      descript: 'Confira sua aba de favoritos.',
    })
  }

  return (
    <>


      <div className={`product-card-image ${isAvailable ? '' : 'unavailable'}`} style={{ width , }}>
        <div className="product-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

          <div className='favorite-icon-wrapper' onClick={(e) => handleClick(e, product.id)}>
            <img className="mini-icon favorite-icon" alt="heart-icon" src={heartIcon} ref={favoriteIconRef} />
          </div>

          {isAvailable === false && <p className='p-unavailable'>ESGOTADO</p>}
          <img src={`${url}/${images[currentIndex]}`} alt={productName} title={productName} className={`product-card-image ${isAvailable ? '' : 'unavailable-presentation'}`}  />
        </div>

      </div>
    </>
  );
};
