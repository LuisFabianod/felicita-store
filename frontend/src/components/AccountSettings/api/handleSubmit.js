import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeRef, emailRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão

    // Validação do formulário
    if (shouldSubmit(emailRef)) {
      const formData = { // objeto que será passado no body da requisição
        actualEmail: localStorage.getItem('userEmail'),
        newEmail: emailRef.current.value, // email enviado pelo form
        newName: nomeRef.current.value // nome enviado pelo form
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
            setApiMessage(data.message);
            
        } else {
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake();
        }
      
    }else{
      triggerErrorMessageShake();
    }
  }