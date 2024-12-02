import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, token, passwordRef, password2Ref, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão
    try{
      // Validação do formulário
    if (shouldSubmit(passwordRef, password2Ref)) {
      const formData = { // objeto que será passado no body da requisição
        newPassword: passwordRef.current.value, // senha enviada pelo form
        token
      };

        const response = await fetch('http://localhost:5000/account/reset-password', { // acessa a rota de login da api, com os dados do form
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setApiMessage(data.message); // define o texto da div api-message 
        } else {
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        }
      
    }else{
      triggerErrorMessageShake(); // ativação da animação de erro
    }
    }catch(error){
      setApiMessage('Erro no servidor') // define o texto da div api-message 
    }
    
  }