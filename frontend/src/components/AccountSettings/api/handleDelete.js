// Função para tratar o envio do formulário
export const handleDelete = async ( setApiMessage, triggerApiMessageShake, setIsLoading) => {
  try{
        const userEmail = localStorage.getItem('userEmail')

        const response = await fetch('http://localhost:5000/account/delete', { // acessa a rota de delete da api com os dados do form
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userEmail}) 
        });
        setIsLoading(true);
        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
            // localStorage clear
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            document.cookie = data.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // define a data de expiração para o passado, como método de excluir o cookie
            window.location.href = data.redirectUrl; // redireciona o usuário para home
                     
        } else {
          setIsLoading(false);
          setApiMessage(data.message); // define o texto da div api-message 
          triggerApiMessageShake(); // ativação da animação de erro
        }
    }catch(error){
      setIsLoading(false);
        setApiMessage('Erro no servidor') // define o texto da div api-message 
    }
  }
  