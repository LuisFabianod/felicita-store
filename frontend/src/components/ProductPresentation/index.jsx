import './styles.css';
import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';

import heartIcon from '../../assets/images/heart.png'
import { IsLoggedInContext } from '../../Contexts/IsLoggedIn';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { Notification } from '../Notification';
import { addFavorite } from './api/addFavorite';


export const ProductPresentation = ({ product, url, maxWidth, maxHeight, isAvailable, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [images, setImages] = useState([])

  const favoriteIconRef = useRef(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationImg, setNotificationImg] = useState(null);
  const [notificationDescript, setNotificationDescript] = useState(null);

  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { setIsLoading } = useContext(IsLoadingContext);

  useFetchImagesEffect(product, setImages)

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

  const handleClick = (e, productId, isLoggedIn, setIsLoading, setNotificationTitle) => {
    e.preventDefault();
    addFavorite(productId, setIsLoading, setNotificationTitle);

  }

  return (
    <>
      {showNotification &&
        <Notification title={notificationTitle} src={notificationImg} descript={notificationDescript} onClose={() => setShowNotification(false)} />
      }

      <div className={`product-card-image ${isAvailable ? '' : 'unavailable'}`} style={{ maxWidth: maxWidth, }}>
        <div className="product-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

          <div className='favorite-icon-wrapper' onClick={(e) => handleClick(e, product.id, isLoggedIn, setIsLoading, setNotificationTitle)}>
            <img className="mini-icon favorite-icon" alt="heart-icon" src={heartIcon} ref={favoriteIconRef} />
          </div>

          {isAvailable === false && <p className='p-unavailable'>ESGOTADO</p>}
          <img src={`${url}/${images[currentIndex]}`} alt={productName} title={productName} className={`product-card-image ${isAvailable ? '' : 'unavailable-presentation'}`} style={{ width: '100vw', maxHeight: maxHeight }} />
        </div>

      </div>
    </>
  );
};
