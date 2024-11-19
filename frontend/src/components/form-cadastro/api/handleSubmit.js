import { shouldSubmit } from '../utils/validation';
import { nameFormatation } from '../utils/nameFormatation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref, setApiMessage) => {
    e.preventDefault(); // Impede o envio padrão

    // Validação do formulário
    if (shouldSubmit(nomeRef, sobrenomeRef, emailRef, passwordRef, password2Ref)) {
      nomeRef.current.value = nameFormatation(nomeRef); // Formatar o nome
      sobrenomeRef.current.value = nameFormatation(sobrenomeRef); // Formatar o sobrenome

      // Coleta os dados do formulário
      const formData = {
        nome: nomeRef.current.value,
        sobrenome: sobrenomeRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password2: password2Ref.current.value
      };

      try {
        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/cadastro/cadastrar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });

        // Processa a resposta da API
        const data = await response.json();

        if (response.ok) {
          // Sucesso
          setApiMessage(data.message);
        } else {
          // Erro
          setApiMessage(data.message);
        }
      } catch (error) {
        // Caso ocorra um erro na requisição
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.');
      }
    }
  }