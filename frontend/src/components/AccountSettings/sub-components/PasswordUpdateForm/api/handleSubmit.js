import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, newPasswordRef, newPassword2Ref, passwordRef,setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    try{
     
    if (shouldSubmit(newPasswordRef, newPassword2Ref)) {  // Validação do formulário

      const formData = { 
        actualEmail: localStorage.getItem('userEmail'), 
        newPassword: newPasswordRef.current.value, 
        actualPassword: passwordRef.current.value, 
      };

        setIsLoading(true);
        const response = await fetch('http://localhost:5000/account/update', { // acessa a rota de update da api, com os dados do form
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });

        const data = await response.json(); 

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
            
        } else {
          setIsLoading(false);
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        }
    }else{
      setIsLoading(false);
      triggerErrorMessageShake(); // ativação da animação de erro
    }
    }catch(error){
      setApiMessage('Erro no servidor') // define o texto da div api-message 
    }
    
  }