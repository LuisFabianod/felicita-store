import './styles.css'
import React, { useState, useRef } from 'react'
import { handleSubmit } from './api/handleSubmit.js';

export const ProductRegister = () => {

  // DECLARAÇÃO DOS INPUTS
  const nomeProdutoRef = useRef(null);
  const descricaoProdutoRef = useRef(null);
  const categoriaProdutoRef = useRef(null);
  const precoProdutoRef = useRef(null);
  const estoqueProdutoRef = useRef(null);
  const imagem1ProdutoRef = useRef(null);
  const imagem2ProdutoRef = useRef(null);

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor

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

 return (
    <>
    <div className='register-product-form'>
    
      <form  className='form'>
      {apiMessage && <div className={`api-message ${isApiMessageShaking ? 'shake' : ''}`} >{apiMessage}</div>}
        <h1>Registrar Novo Produto</h1>
        <div>
        
        </div>
        <div className='register-product-div'>
          <div className='nome'>
            <input type='text' placeholder='*Nome do produto' name='nome' ref={nomeProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

          <div className='nome'>
            <input type='text' placeholder='*Descrição do produto' name='descricao' ref={descricaoProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>
          

        <div className='nome'>
            <input type='text' placeholder='*Categoria(s) (separe-as por vírgula)' name='categoria' ref={categoriaProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

          <div className='nome'>
            <input type='number' placeholder='*Preço (Ex: 100,00)' name='preco' ref={precoProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

          <div className='nome'>
            <input type='number' placeholder='*Estoque' name='descricao' ref={estoqueProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

          <div className='nome'>
            <label htmlFor="imagem1">*Imagem 1</label>
            <input type='file' name='imagem1' ref={imagem1ProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

          <div className='nome'>
          <label htmlFor="imagem1">*Imagem 2 (opcional)</label>
            <input type='file' name='imagem2' ref={imagem2ProdutoRef}></input>
            <span  className={`error-message ${isErrorMessageShaking ? 'shake' : ''}`}></span>
          </div>

        </div>

        <button type='button' onClick={(e) => handleSubmit(e, nomeProdutoRef, descricaoProdutoRef, categoriaProdutoRef, precoProdutoRef,estoqueProdutoRef, imagem1ProdutoRef, imagem2ProdutoRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake)}>Registrar novo produto</button>
        
      </form>

    </div>
    
    </>
  )
}