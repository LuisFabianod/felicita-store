import './styles.css'
import React, { useState, useRef, useContext, } from 'react'
import { handleSubmit } from './api/handleSubmit.js';
import { IsLoadingContext } from '../../Contexts/IsLoading'
import { ImageInput } from '../ImageInput/index.jsx';
import { LoadingSpinner } from '../Loading/index.jsx';
import { getImagesDirectory } from './api/getImagesDirectory.js';

export const LayoutConfig = () => { 

  const imagesDivRef = useRef(null);

  const [ layoutConfig, setLayoutConfig ] = useState({});

  const [ images, setImages ] = useState([]); 

  const [totalImages, setTotalImages] = useState([0])

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor

  const { isLoading ,setIsLoading } = useContext(IsLoadingContext);

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

  const handleLoadConfigButtonClick = async () => {
      await getImagesDirectory(setApiMessage, setIsLoading, setLayoutConfig);

      if(!layoutConfig.imagens) return 
                const response = await fetch(`http://localhost:5000/layout-config/images/${layoutConfig.imagens}`, {
                    method: 'GET',
                   
                });
    
                if (response.ok) {
                    const data = await response.json(); 
                    setImages(data.imageNames);
                    setTotalImages([...images, 0]);
                    
                } else {
                    console.error('Erro ao carregar as imagens', response);
                }
  }

  return (
    <>
      {isLoading && 
        <LoadingSpinner/>
       }  

      <div className='register-product-form'>

        <form className='form'>
          {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`}>{apiMessage}</div>}
          <h1>Configurações visuais</h1>
          <button type='button' className='load-config' onClick={handleLoadConfigButtonClick}>Carregar configurações</button>
          <div>

         </div> 
          <div className='register-product-div'>
            <div className='nome'>
              <input type='text' placeholder='provisório' ></input>
            </div>

            
            <div className='add-images' ref={imagesDivRef}>
              <h2>Imagens para o carrossel</h2>

              { 

                totalImages.map((loadedImage, index) => {
                  return (
                    <ImageInput key={index}
                      setTotalImages={setTotalImages}
                      totalImages={totalImages}
                      index={index}
                      loadedImage={loadedImage}
                      url={`http://localhost:5000/images/home/${layoutConfig.imagens}`}
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