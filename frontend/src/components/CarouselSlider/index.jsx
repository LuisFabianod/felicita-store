import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

export const CarouselSlider = ({ images, url, width, maxHeight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container" style={{ width: width }}>
      <div className="carousel">
        <motion.div
          className="carousel-track"
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={`${url}/${img}`}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
              style={{ maxHeight: maxHeight }}
            />
          ))}
        </motion.div>
      </div>

      {/* Botões de navegação */}
      <button onClick={prevSlide} className="carousel-btn prev-btn">
        &lt;
      </button>
      <button onClick={nextSlide} className="carousel-btn next-btn">
        &gt;
      </button>

      {/* Indicadores */}
      <div className="carousel-dots">
        <div className="carousel-dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            >
              O
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
