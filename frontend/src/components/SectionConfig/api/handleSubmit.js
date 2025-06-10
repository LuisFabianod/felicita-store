// Função para tratar o envio do formulário
export const handleSubmit = async (e, sectionNameRef, sectionOrderRef, setApiMessage, triggerApiMessageShake, setIsLoading) => {
    e.preventDefault(); 
    
    const BACK_END = process.env.REACT_APP_BACK_END;

    try{

        setIsLoading(true);
        const response = await fetch(`${BACK_END}/section/add-section`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // <-- ESSENCIAL
          },
          body: JSON.stringify({
            sectionName: sectionNameRef.current.value,
            sectionOrder: sectionOrderRef.current.value
          }),
          credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
            
        } else {
          setIsLoading(false);
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        
    }
  }catch(error){
      setIsLoading(false);
      setApiMessage('Erro no servidor') // define o texto da div api-message 
  }
  }