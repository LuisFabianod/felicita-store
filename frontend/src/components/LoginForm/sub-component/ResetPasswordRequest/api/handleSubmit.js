import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, emailRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão]
    try{
    // Validação do formulário
    if (shouldSubmit(emailRef)) {
      const formData = { // objeto que será passado no body da requisição
        userEmail: emailRef.current.value // nome enviado pelo form
      };

        setIsLoading(true);
        const response = await fetch('http://localhost:5000/account/forgot-password', { // acessa a rota de login da api, com os dados do form
          method: 'POST',   
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
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
      }else{
          triggerErrorMessageShake(); // ativação da animação de erro
        
        }
      }catch(error){
        setIsLoading(false);
        setApiMessage('Erro no servidor'); // define o texto da div api-message 
      }
      }
      
  