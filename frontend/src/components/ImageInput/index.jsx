import React, { useState, useRef } from 'react'

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
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    }

    return (
            <div className='nome image-input'>
                <label htmlFor={`imagem${index + 1}`}>*Imagem {index + 1}</label>
                <img src={image} alt='img-preview' />
                <input type='file' name='imagem1' ref={imagemProdutoRef} onInput={handleInput}></input>
                
                <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
                
            </div>
    )
}