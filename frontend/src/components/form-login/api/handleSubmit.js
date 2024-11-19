import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, emailRef, passwordRef, setApiMessage, rememberSession) => {
    e.preventDefault(); // Impede o envio padrão

    // Validação do formulário
    if (shouldSubmit(emailRef, passwordRef)) {
      // Coleta os dados do formulário
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        rememberSession
      };

        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/login/login-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        // Processa a resposta da API
        const data = await response.json();

        if (response.ok) {
            document.cookie = data.cookieName + "=" + data.cookieValue + ";" + data.cookieAge + ";path=/"; 
            window.location.href = data.redirectUrl;
        } else {
          // Erro
          setApiMessage(data.message);
        }
      
    }
  }