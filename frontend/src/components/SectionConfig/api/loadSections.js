export const loadSections = async (setIsLoading, setApiMessage, setSections) => {
    
    const BACK_END = process.env.REACT_APP_BACK_END;

    try {
        setIsLoading(true);
        
        // Envia os dados para a API
        const response = await fetch(`${BACK_END}/section/load-sections`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message
            setSections(data.sections)
        } else {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
        }
    } catch (error) {
        setIsLoading(false);
        console.error(error);
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
    }
}