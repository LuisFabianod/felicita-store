import React, { useState } from 'react'

export const ImageInput = ({ imagemProdutoRef, isErrorMessageShaking, setTotalImages, totalImages, index }) => {

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
        <>
            <div className='nome imagem-input'>
                <label htmlFor="imagem1">*Imagem {index + 1}</label>
                <img src={image} alt='img-preview' />
                <input type='file' name='imagem1' ref={imagemProdutoRef} onInput={handleInput}></input>
                
                <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
                
            </div>
        </>
    )
}