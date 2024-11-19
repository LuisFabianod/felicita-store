const handleExit = async (setApiMessage) => {
    try {
        // Faz a requisição para a rota de logout no backend
        const response = await fetch('http://localhost:5000/login/logout', {
            method: 'POST', 
            credentials: 'include', // Inclui cookies na requisição
        });
    
        if (response.ok) {
            const data = await response.json(); // Processa a resposta da API
            document.cookie = data.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // define a data de expiração para o passado, como método de excluir o cookie
            window.location.href = data.redirectUrl;  // redireciona o usuário deslogado
        } else {
            setApiMessage('Erro ao sair da conta'); // define o texto da div api-message 
        }
    } catch (error) {
        setApiMessage('Erro ao sair da conta'); // define o texto da div api-message 
    }
};