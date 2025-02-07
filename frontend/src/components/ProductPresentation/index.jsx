import React, { useState } from 'react';
import './styles.css';

export const ProductPresentation = ({ images, url, width, maxHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseEnter= () => {

    if(images.length > 1) setCurrentIndex(1);

    return
  }
  return (
    <>
      <div className="product-card-container" style={{ width: width, }}>
        <div className="product-card" onMouseEnter={handleMouseEnter} onMouseLeave={() => setCurrentIndex(0)}>
            <img src={`${url}/${images[currentIndex]}`} alt={`Slide ${currentIndex + 1}`} className="product-card-image" style={{width:'100vw', maxHeight: maxHeight  }} />
          
          </div>

        </div>
    </>
  );
};
