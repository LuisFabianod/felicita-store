import React, { useEffect, useRef } from 'react';
import { Spinner } from 'spin.js';

export const LoadingSpinner = () => {
  const spinnerContainerRef = useRef(null); // Referência para o container onde o spinner será inserido

  useEffect(() => {
    // Opções de configuração para o spinner
    const options = {
      lines: 12, // Número de linhas no spinner
      length: 7, // Comprimento das linhas
      width: 5, // Espessura das linhas
      radius: 10, // Raio do spinner
      scale: 1, // Escala do spinner
      corners: 1, // Qualidade das bordas
      color: '#8c8a78', // Cor do spinner
      fadeColor: '#f6f0f1', // Cor de fade para o fundo
      animation: 'spinner-line-fade-quick', // Tipo de animação
      position: 'absolute', // Posição do spinner
      top: '50%', // Posição vertical
      left: '50%', // Posição horizontal
      shadow: '0 0 15px rgba(0, 0, 0, 0.3)', // Sombra do spinner
    };

    // Cria a instância do spinner e a renderiza no container
    const spinner = new Spinner(options).spin(spinnerContainerRef.current);

    // Limpeza do spinner quando o componente for desmontado
    return () => {
      spinner.stop();
    };
  }, []); // Este efeito roda uma vez quando o componente é montado

  return (
    <div className='loading-div'>
    <div
      ref={spinnerContainerRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
    />
    </div>
  );
};

