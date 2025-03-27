import './styles.css'
import React, { useState, useRef, useEffect } from 'react'
import closeIcon from '../../assets/images/x.png'

export const ImageInput = ({ isErrorMessageShaking, setTotalImages, totalImages, index, loadedImage, url }) => {
    const imagemProdutoRef = useRef(null)
    const [image, setImage] = useState(null);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [switched, setSwitched] = useState(false);
    

    useEffect(() => {
        if (loadedImage) {
            setImage(loadedImage);
            setIsFirstTime(false)

            const handleFillInput = async () => {
                try {
                    const response = await fetch(`${url}/${loadedImage}`);
                    
                    if (!response.ok) throw new Error("Erro ao buscar imagem");
            
                    const blob = await response.blob(); 
                    const file = new File([blob], loadedImage, { type: blob.type });
            
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
            
                    if (imagemProdutoRef.current) {
                        imagemProdutoRef.current.files = dataTransfer.files;
            
                        const event = new Event('change', { bubbles: true });
                        imagemProdutoRef.current.dispatchEvent(event);
                    }
                } catch (error) {
                    console.error("Erro ao carregar a imagem:", error);
                }
            };

            handleFillInput();
        }
    }, [loadedImage, url]); 

    const handleInput = (event) => {
        setSwitched(true);
        if (isFirstTime) {
            setTotalImages([...totalImages, 0])
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
            
            {image && <img src={!switched ? `${url}/${image}`: image} alt='img-preview' />}
            <input type='file' name={`imagem${index + 1}`} ref={imagemProdutoRef} onInput={handleInput} className='image-input'/>

            <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
        </div>
    )
}
