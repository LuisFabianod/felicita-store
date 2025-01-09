import './styles.css'
import React, { useState, useRef, useContext, } from 'react'
import { handleSubmit } from './api/handleSubmit.js';
import { IsLoadingContext } from '../../Contexts/IsLoading'
import { ImageInput } from './sub-components/ImageInput/index.jsx';

export const ProductRegister = () => {

  // DECLARAÇÃO DOS INPUTS
  const nomeProdutoRef = useRef(null);
  const descricaoProdutoRef = useRef(null);
  const secaoProdutoRef = useRef(null);
  const precoProdutoRef = useRef(null);
  const precoCustoProdutoRef = useRef(null);
  const estoqueProdutoRef = useRef(null);

  const imagesDivRef = useRef(null);

  const [totalImages, setTotalImages] = useState([1])

  const [margemLucro, setMargemLucro] = useState(null)

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor

  const { setIsLoading } = useContext(IsLoadingContext)

  const [isErrorMessageShaking, setIsErrorMessageShaking] = useState(false); // estado para controle da animação de erro da span erro

  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message

  const triggerErrorMessageShake = () => { // ativa a animação de erro nos inputs 
    setIsErrorMessageShaking(true);
    setTimeout(() => setIsErrorMessageShaking(false), 1000); // Duração da animação
  };

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

  const handlePrecoProdutoChange = () => {
    setMargemLucro('Margem de lucro = ' + ((precoProdutoRef.current.value - precoCustoProdutoRef.current.value) / precoProdutoRef.current.value) * 100 + '%')
  }

  return (
    <>
      <div className='register-product-form'>

        <form className='form'>
          {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`}>{apiMessage}</div>}
          <h1>Registrar Novo Produto</h1>
          <div>

          </div>
          <div className='register-product-div'>
            <div className='nome'>
              <input type='text' placeholder='*Nome do produto' name='nome' ref={nomeProdutoRef}></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>

            <div className='nome'>
              <input type='text' placeholder='*Descrição do produto' name='descricao' ref={descricaoProdutoRef}></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>


            <div className='nome'>
              <input type='text' placeholder='*Seção do produto' name='categoria' ref={secaoProdutoRef}></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>

            <div className='nome'>
              <input type='number' placeholder='*Preço (Ex: 100,00)' name='preco' ref={precoProdutoRef} ></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>

            <div className='nome'>
              <input type='number' placeholder='Preço Promocional' name='preco' ></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>

            <div className='margem-de-lucro'>

              <div className='nome'>
                <input type='number' placeholder='Preço de Custo' name='preco' ref={precoCustoProdutoRef} onBlur={handlePrecoProdutoChange}></input>
                <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
              </div>

              <div className='nome'>
                <input type='number' placeholder={margemLucro ? margemLucro : 'Margem de Lucro'} name='preco' ></input>
                <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
              </div>
            </div>

            <div className='nome'>
              <input type='number' placeholder='*Estoque' name='descricao' ref={estoqueProdutoRef}></input>
              <span className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
            </div>

            <div className='add-images' ref={imagesDivRef}>
              <h2>Imagens</h2>

              {
                totalImages.map((_, index) => {
                  return (
                      <ImageInput key={index}
                        isErrorMessageShaking={isErrorMessageShaking}
                        setTotalImages={setTotalImages}
                        totalImages={totalImages}
                        index={index}
                      />
                  )
                })
              }
            </div>


          </div>

          <button type='button' onClick={(e) => handleSubmit(e, nomeProdutoRef, descricaoProdutoRef, secaoProdutoRef, precoProdutoRef, estoqueProdutoRef, imagesDivRef, totalImages, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading)}>Registrar novo produto</button>

        </form>

      </div>
      
    </>
  )
}