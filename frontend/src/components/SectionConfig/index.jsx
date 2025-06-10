import './styles.css'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { IsLoadingContext } from '../../Contexts/IsLoading/index.jsx'
import { LoadingSpinner } from '../Loading/index.jsx';
import { loadSections } from './api/loadSections.js';
import { handleSubmit } from './api/handleSubmit.js';

export const SectionConfig = () => {

  const sectionNameRef = useRef(null);
  const sectionOrderRef = useRef(null);

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message
  const [sections, setSections] = useState([]);

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

  useEffect(() => {
      loadSections(setIsLoading, setApiMessage, setSections);
  }, [setIsLoading])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className='sections-container'> 
        {sections.map((section) => {
          return(
            <p key={section.id}>{section.nome}</p>
          )
        })}
      </div>
        <p>{apiMessage}</p>
      <form>
        <input type="text" placeholder='Nome da seção' ref={sectionNameRef}/>
        <input type="number" placeholder='Ordem da seção' ref={sectionOrderRef}/>
        <button onClick={(e) => handleSubmit(e, sectionNameRef, sectionOrderRef, setApiMessage, triggerApiMessageShake, setIsLoading)}>Adcionar seção</button>
      </form>
    </>
  );
};
