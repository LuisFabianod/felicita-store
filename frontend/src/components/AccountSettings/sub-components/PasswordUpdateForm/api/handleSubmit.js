import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, newPasswordRef, newPassword2Ref, passwordRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão
    try{
      // Validação do formulário
    if (shouldSubmit(newPasswordRef, newPassword2Ref)) {
      const formData = { // objeto que será passado no body da requisição
        actualEmail: localStorage.getItem('userEmail'),
        newPassword: newPasswordRef.current.value, // senha enviada pelo form
        actualPassword: passwordRef.current.value, // senha atual pegada no localStorage
      };

        const response = await fetch('http://localhost:5000/account/update', { // acessa a rota de login da api, com os dados do form
          method: 'PUT',
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