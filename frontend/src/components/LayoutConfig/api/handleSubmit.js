// Função para tratar o envio do formulário
export const handleSubmit = async (e,imagesDivRef, totalImages, setApiMessage, triggerApiMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    try{
        
        const formData = new FormData();

        totalImages.forEach((_, index) => {
            const input = imagesDivRef.current.children[index].querySelector('input[type="file"]'); // Acessa o input de arquivo dentro de cada ImageInput
            if (input && input.files.length > 0) {
                formData.append(`images`, input.files[0]); // Adiciona o arquivo ao formData com a chave 'imagens'
            }
        });

        setIsLoading(true);
        const response = await fetch('http://localhost:5000/layout-config/update', { // acessa a rota de update da api, com os dados do form
          method: 'PUT',
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