// Função para tratar o envio do formulário
export const handleVerifyEmail = async (e, verificationCodeRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão
    
      // Coleta o código de verificação de e-mail
      const formData = {
        userVerificationCode: verificationCodeRef.current.value
      }
        
      try {
        // Envia os dados para a API (código de verificação de e-mail)
        const response = await fetch('http://localhost:5000/account/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {

          setApiMessage(data.message); // define o texto da div api-message 
          
        } else {
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        }
      } catch (error) {
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
      }
    
  }