import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, emailRef, passwordRef, setApiMessage, rememberSession, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    try{
      // Validação do formulário
    if (shouldSubmit(emailRef, passwordRef)) {
      const formData = { // objeto que será passado no body da requisição
        email: emailRef.current.value, // email enviado pelo form
        password: passwordRef.current.value, // senha enviada pelo form
        rememberSession // valor da checkBox rememberSession (true | false)
      };

        setIsLoading(true); 
        const response = await fetch('http://localhost:5000/account/login-user', { // acessa a rota de login da api, com os dados do form
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });

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
      
    }else{
      triggerErrorMessageShake(); // ativação da animação de erro
    }
    }catch(error){
      setIsLoading(false);
      setApiMessage('Erro no servidor') // define o texto da div api-message 
    }
    
  }