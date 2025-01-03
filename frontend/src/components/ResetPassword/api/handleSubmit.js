import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, token, passwordRef, password2Ref, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    try{
      // Validação do formulário
    if (shouldSubmit(passwordRef, password2Ref)) {
      const formData = { // objeto que será passado no body da requisição
        newPassword: passwordRef.current.value, // senha enviada pelo form
        token // token com id do usuário
      };

        setIsLoading(true);
        const response = await fetch('http://localhost:5000/account/reset-password', { // acessa a rota de reset da senha da api, com os dados do form
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); 
        } else {
          setIsLoading(false);
          setApiMessage(data.message); 
          triggerApiMessageShake(); 
        }
      
    }else{
      triggerErrorMessageShake(); 
    }
    }catch(error){
      setIsLoading(false);
      setApiMessage('Erro no servidor')
    }
    
  }