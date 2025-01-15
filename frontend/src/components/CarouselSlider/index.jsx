import React, { useState } from 'react';
import './styles.css';  // Para aplicar o estilo (pode criar esse arquivo)

export const CarouselSlider = ({images, product}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <div className="carousel-container">
      <div className="carousel">
    
        <img src={`http://localhost:5000/images/${product.imagens}/${images[currentIndex]}`} alt={`Slide ${currentIndex + 1}`} className="carrossel-image" />
        
       
        <button onClick={prevSlide} className="carousel-btn prev-btn">&lt;</button>
        <button onClick={nextSlide} className="carousel-btn next-btn">&gt;</button>
      </div>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >O</span>
        ))}
      </div>
    </div>
   
</>
  );
};