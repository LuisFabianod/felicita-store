// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeProdutoRef, descricaoProdutoRef, secaoProdutoRef, precoProdutoRef,estoqueProdutoRef, imagem1ProdutoRef, setApiMessage, triggerApiMessageShake, setIsLoading) => {
    e.preventDefault(); // Impede o envio padrão

    const formData = new FormData();

    formData.append('nomeProduto',  nomeProdutoRef.current.value)
    formData.append('descricaoProduto',  descricaoProdutoRef.current.value)
    formData.append('secaoProduto',  secaoProdutoRef.current.value)
    formData.append('precoProduto',  precoProdutoRef.current.value)
    formData.append('estoqueProduto',  estoqueProdutoRef.current.value)
    formData.append('imagem1Produto',  imagem1ProdutoRef.current.files[0])

    try {

        setIsLoading(true);
        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/product/register-product', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 

        } else {
            setIsLoading(false);
            setApiMessage(data.message); // define o texto da div api-message 
            triggerApiMessageShake(); // ativação da animação de erro
        }
    } catch (error) {
        setIsLoading(false);
        console.error(error)
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
    }
}
