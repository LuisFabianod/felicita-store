export const loadProducts = async (setIsLoading, setApiMessage, setProducts) => {
    
    try {
        setIsLoading(true);
        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/product/read-products', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message
            setProducts(data.products); 
        } else {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
        }
    } catch (error) {
        setIsLoading(false);
        console.error(error);
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
    }
};
