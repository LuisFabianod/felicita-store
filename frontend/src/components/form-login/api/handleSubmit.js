import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, emailRef, passwordRef, setApiMessage, rememberSession) => {
    e.preventDefault(); // Impede o envio padrão

    // Validação do formulário
    if (shouldSubmit(emailRef, passwordRef)) {
      const formData = { // objeto que será passado no body da requisição
        email: emailRef.current.value, // email enviado pelo form
        password: passwordRef.current.value, // senha enviada pelo form
        rememberSession // valor da checkBox rememberSession (true | false)
      };

        const response = await fetch('http://localhost:5000/login/login-user', { // acessa a rota de login da api, com os dados do form
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            // cria um cookie com as informações passadas pelo back-end
            document.cookie = data.cookieName + "=" + data.cookieValue + ";" + data.cookieAge + ";path=/"; 
            window.location.href = data.redirectUrl; // redireciona o usuário para home logado
        } else {
          setApiMessage(data.message); // define o texto da div api-message 
        }
      
    }
  }