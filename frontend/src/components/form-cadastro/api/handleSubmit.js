// Função para tratar o envio do formulário
export const handleSubmit = async (e, verificationCodeRef, setApiMessage, triggerApiMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    
      // Coleta o código de verificação de e-mail
      const formData = {
        userVerificationCode: verificationCodeRef.current.value
      }
        
      try {
        // Envia os dados para a API (código de verificação de e-mail)
        const response = await fetch('http://localhost:5000/account/register-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        setIsLoading(true);
        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
          setIsLoading(false);
          // salva dados do usuário que serão usados no frontend no localStorage
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('userEmail', data.userEmail);
          
          // cria um cookie com as informações passadas pelo back-end
          document.cookie = data.cookieName + "=" + data.cookieValue + ";" + data.cookieAge + ";path=/"; 
          window.location.href = data.redirectUrl; // redireciona o usuário para home logado;
          
        } else {
          setIsLoading(false);
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        }
      } catch (error) {
        setIsLoading(false);
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
      }
    
  }