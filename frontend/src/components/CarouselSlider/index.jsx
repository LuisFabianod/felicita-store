import React, { useState } from 'react';
import './styles.css';

export const CarouselSlider = ({ images, url, width, maxHeight }) => {
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
      <div className="carousel-container" style={{ width: width, }}>
        <div className="carousel">
            <button onClick={prevSlide} className="carousel-btn prev-btn">&lt;</button>
            <img src={`${url}/${images[currentIndex]}`} alt={`Slide ${currentIndex + 1}`} className="carousel-image" style={{width:'100vw', maxHeight: maxHeight  }} />
            <button onClick={nextSlide} className="carousel-btn next-btn">&gt;</button>

          <div className="carousel-dots">
            <div className='carousel-dots-container'>
            {images.map((_, index) => (
              <span
                key={index}
                className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                O
              </span>
            ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
