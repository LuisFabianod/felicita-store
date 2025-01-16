import './styles.css'
import React, { useState, useRef, useContext, } from 'react'
import { handleSubmit } from './api/handleSubmit.js';
import { IsLoadingContext } from '../../Contexts/IsLoading'
import { ImageInput } from '../ImageInput/index.jsx';
import { LoadingSpinner } from '../Loading/index.jsx';

export const LayoutConfig = () => { 

  const imagesDivRef = useRef(null);

  const [totalImages, setTotalImages] = useState([1])

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor

  const { isLoading ,setIsLoading } = useContext(IsLoadingContext)

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

  return (
    <>
    {isLoading && 
        <LoadingSpinner/>
       }  

      <div className='register-product-form'>

        <form className='form'>
          {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`}>{apiMessage}</div>}
          <h1>Configurações visuais</h1>
          <div>

         </div> 
          <div className='register-product-div'>
            <div className='nome'>
              <input type='text' placeholder='provisório' ></input>
            </div>

            
            <div className='add-images' ref={imagesDivRef}>
              <h2>Imagens para o carrossel</h2>

              {
                totalImages.map((_, index) => {
                  return (
                    <ImageInput key={index}
                      setTotalImages={setTotalImages}
                      totalImages={totalImages}
                      index={index}
                    />
                  )
                })
              }
            </div>
            
          </div>

          <button type='button' onClick={(e) => handleSubmit(e,imagesDivRef, totalImages, setApiMessage, triggerApiMessageShake, setIsLoading)}>Mudar configurações</button>

        </form>

      </div>

    </>
  )
}