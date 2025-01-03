// função para fazer o fetch e verificar se a sessão está ativa
export const verifySession = async (setIsLoggedIn, setIsAdmin, setIsLoading) => {
    try {

        setIsLoading(true);
        const response = await fetch('http://localhost:5000/verificar-login', { // acessa a rota de verificar login no back-end
            method: 'GET', 
            credentials: 'include', // inclui cookies na requisição
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json(); // processa a resposta da api

        if (response.ok) {
            setIsLoading(false);
            setIsLoggedIn(data.loggedIn); // muda o estado para logado
            setIsAdmin(data.isAdmin);
            
        } else {
            setIsLoading(false);
            console.error('Erro na verificação de login');
            localStorage.removeItem('userName'); // remove do localStorage pois o cookie pode ter acabado
            localStorage.removeItem('userEmail'); // remove do localStorage pois o cookie pode ter acabado
            
        }
    } catch (error) {
        setIsLoading(false);
        console.error('Erro na requisição:', error);
    }
};