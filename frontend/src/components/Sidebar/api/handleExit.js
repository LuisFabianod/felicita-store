export const handleExit = async (setApiMessage, triggerApiMessageShake, setIsLoading) => {
    try {
        // Faz a requisição para a rota de logout no backend
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/account/logout', {
            method: 'POST', 
            credentials: 'include', // Inclui cookies na requisição
        });
        
        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            // quando feito o logout, os dados do usuário são retirados do localStorage
            localStorage.removeItem('userName'); 
            localStorage.removeItem ('userEmail');

            document.cookie = data.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // define a data de expiração para o passado, como método de excluir o cookie
            window.location.href = data.redirectUrl;  // redireciona o usuário deslogado
        } else {
            setIsLoading(false);
            setApiMessage('Erro ao sair da conta'); // define o texto da div api-message 
            triggerApiMessageShake(); // ativação da animação de erro
        }
    } catch (error) {
        setIsLoading(false);
        setApiMessage('Erro no servidor'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
    }
};