import './styles.css'
import React, { useState, useContext, useEffect } from 'react'
import { IsLoadingContext } from '../../Contexts/IsLoading/index.jsx'
import { LoadingSpinner } from '../Loading/index.jsx';
import { loadSections } from './api/loadSections.js';

export const SectionConfig = () => {

  const [apiMessage, setApiMessage] = useState(''); // estado para mensagem de feedback do servidor
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [isApiMessageShaking, setApiMessageIsShaking] = useState(false); // estado para controle da animação de erro da api-message
  const [sections, setSections] = useState([]);

  const triggerApiMessageShake = () => { // ativa a animação de erro na div api-message
    setApiMessageIsShaking(true);
    setTimeout(() => setApiMessageIsShaking(false), 1000); // Duração da animação
  };

  useEffect(() => {
      loadSections(setIsLoading, setApiMessage, setSections)
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
    </>
  );
};
