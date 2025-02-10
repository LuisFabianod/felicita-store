import './styles.css'
import React, { useState, useRef } from 'react'
import closeIcon from '../../assets/images/x.png'

export const ImageInput = ({ isErrorMessageShaking, setTotalImages, totalImages, index }) => {
    const imagemProdutoRef = useRef(null)
    const [image, setImage] = useState(null);
    const [isFirstTime, setIsFirstTime] = useState(true);

    const handleInput = (event) => {
        if (isFirstTime) {
            setTotalImages([...totalImages, 1])
            setIsFirstTime(false);
        }

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleClick = () => {
        setImage(null); 
        if (imagemProdutoRef.current) {
            imagemProdutoRef.current.value = ""; 
        }

        // Removendo do total de imagens
        const updatedImages = [...totalImages];
        updatedImages.splice(index, 1);
        setTotalImages(updatedImages);
        setIsFirstTime(true); 
    }

    return (
        <div className='nome image-input'>
            <header className='img-input-header'>
                <label htmlFor={`imagem${index + 1}`}>*Imagem {index + 1}</label>
                {image && (
                    <img
                        src={closeIcon}
                        alt="delete-img-icon"
                        className='delete-img-icon'
                        onClick={handleClick}
                    />
                )}
            </header>
            
            {image && <img src={image} alt='img-preview' />}
            <input type='file' name={`imagem${index + 1}`} ref={imagemProdutoRef} onInput={handleInput} />

            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>
    )
}
