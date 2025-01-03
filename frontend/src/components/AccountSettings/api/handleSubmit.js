import { shouldSubmit } from '../utils/validation';

// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão
    try{
    // Validação do formulário
    if (shouldSubmit(nomeRef)) {
      const formData = { // objeto que será passado no body da requisição
        actualEmail: localStorage.getItem('userEmail'),
        newName: nomeRef.current.value // nome enviado pelo form
      };
      
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/account/update', { // acessa a rota de update da api com os dados do form
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData) 
        });
        
        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
            localStorage.setItem('userName', nomeRef.current.value) // edita o nome do usuário no localStorage
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
      
  