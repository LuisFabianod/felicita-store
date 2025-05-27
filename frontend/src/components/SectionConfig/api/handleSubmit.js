// Função para tratar o envio do formulário
export const handleSubmit = async (e,imagesDivRef, totalImages, setApiMessage, triggerApiMessageShake, setIsLoading) => {
    e.preventDefault(); 
    try{

        setIsLoading(true);
        const response = await fetch('http://localhost:5000//update', { 
          method: 'POST',
          body: formData,
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