import { shouldSubmit } from '../utils/validation';
import { nameFormatation } from '../utils/nameFormatation';

// Função para tratar o envio do formulário
export const handleVerifyEmail = async (e, nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref,termsCheck, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão
    
    // Validação do formulário
    if (shouldSubmit(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref)) {
      nomeRef.current.value = nameFormatation(nomeRef); // Formatar o nome
      sobrenomeRef.current.value = nameFormatation(sobrenomeRef); // Formatar o sobrenome

      // Coleta os dados do formulário (Sem o código de verificação de e-mail)
      const formData = {
        nome: nomeRef.current.value,
        sobrenome: sobrenomeRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password2: password2Ref.current.value,
        termsCheck,
      }
        
      try {
        // Envia os dados para a API
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
        console.error(error)
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
      }
    }else{
      triggerErrorMessageShake(); // ativação da animação de erro
    }
  }