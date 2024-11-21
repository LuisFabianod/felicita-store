// função para fazer o fetch e verificar se a sessão está ativa
export const verifySession = async (setIsLoggedIn) => {
    try {
        const response = await fetch('http://localhost:5000/verificar-login', { // acessa a rota de verificar login no back-end
            method: 'GET', 
            credentials: 'include', // inclui cookies na requisição
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json(); // processa a resposta da api
            setIsLoggedIn(data.loggedIn); // muda o estado para logado
            
        } else {
            console.error('Erro na verificação de login');
            localStorage.removeItem('userName'); // remove do localStorage pois o cookie pode ter acabado
            localStorage.removeItem('userEmail'); // remove do localStorage pois o cookie pode ter acabado
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};