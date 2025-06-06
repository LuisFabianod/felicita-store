import './styles.css';
import React, { useContext, useRef, useState } from 'react';
import { useFetchImagesEffect } from '../../hooks/useFetchImagesEffect';

import heartIcon from '../../assets/images/heart.png'
import { IsLoggedInContext } from '../../Contexts/IsLoggedIn';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { Notification } from '../Notification';
import { addFavorite } from './api/addFavorite';
import { Link } from 'react-router-dom';


export const ProductPresentation = ({ product, url, width, height, isAvailable, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [images, setImages] = useState([])

  const favoriteIconRef = useRef(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState(null);
  const [notificationImg, setNotificationImg] = useState(null);
  const [notificationDescript, setNotificationDescript] = useState(null);

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

  const handleClick = (e, productId) => {
    e.preventDefault();

    if(!isLoggedIn){
      setNotificationTitle('Para favoritar um produto, entre em sua conta.')
      setNotificationDescript(<><Link to={'/auth'}>Clique aqui para entrar em sua conta</Link></>);
      setNotificationImg(`http://localhost:5000/images/products/${product.imagens}/${images[0]}`);
      setShowNotification(true);
      return;
    }

    addFavorite(productId, userEmail,setIsLoading, setNotificationTitle);
    setNotificationDescript('');
    setNotificationImg(`http://localhost:5000/images/products/${product.imagens}/${images[0]}`);
    setShowNotification(true);
  }

  return (
    <>
      {showNotification &&
        <Notification title={notificationTitle} src={notificationImg} descript={notificationDescript} onClose={() => setShowNotification(false)} />
      }

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
