// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeProdutoRef, descricaoProdutoRef, categoriaProdutoRef, precoProdutoRef,estoqueProdutoRef, imagem1ProdutoRef, imagem2ProdutoRef, setApiMessage, triggerApiMessageShake) => {
    e.preventDefault(); // Impede o envio padrão

    const formData = new FormData();

    formData.append('nomeProduto',  nomeProdutoRef.current.value)
    formData.append('descricaoProduto',  descricaoProdutoRef.current.value)
    formData.append('categoriaProduto',  categoriaProdutoRef.current.value)
    formData.append('precoProduto',  precoProdutoRef.current.value)
    formData.append('estoqueProduto',  estoqueProdutoRef.current.value)
    formData.append('imagem1Produto',  imagem1ProdutoRef.current.files[0])
    formData.append('imagem2Produto',  imagem2ProdutoRef.current.files[0])

    try {
        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/product/register-product', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        const data = await response.json(); // Processa a resposta da API

        if (response.ok) {
            setApiMessage(data.message); // define o texto da div api-message 

        } else {
            setApiMessage(data.message); // define o texto da div api-message 
            triggerApiMessageShake(); // ativação da animação de erro
        }
    } catch (error) {
        console.error(error)
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.'); // define o texto da div api-message 
        triggerApiMessageShake(); // ativação da animação de erro
    }
}
