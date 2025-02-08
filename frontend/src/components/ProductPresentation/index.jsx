import React, { useState } from 'react';
import './styles.css';

export const ProductPresentation = ({ images, url, maxWidth, maxHeight, isAvailable }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseEnter= () => {

    if(images.length > 1) setCurrentIndex(1);

    return
  }
  return (
    <>
      <div  className={`product-card-image ${isAvailable? '': 'unavailable'}`} style={{ maxWidth: maxWidth, }}>
        <div className="product-card" onMouseEnter={handleMouseEnter} onMouseLeave={() => setCurrentIndex(0)}>
          {isAvailable === false && <p className='p-unavailable'>ESGOTADO</p>}
            <img src={`${url}/${images[currentIndex]}`} alt={`Slide ${currentIndex + 1}`} className={`product-card-image ${isAvailable? '': 'unavailable-presentation'}`} style={{width:'100vw', maxHeight: maxHeight  }} />
          </div>

        </div>
    </>
  );
};
