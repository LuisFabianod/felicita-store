// Função para tratar o envio do formulário
export const handleSubmit = async (e, nomeProdutoRef, descricaoProdutoRef, categoriaProdutoRef, estoqueProdutoRef, imagem1ProdutoRef, imagem2ProdutoRef, setApiMessage, triggerApiMessageShake, triggerErrorMessageShake) => {
    e.preventDefault(); // Impede o envio padrão

    const formData = { 
        nomeProduto: nomeProdutoRef.current.value, 
        descricaoProduto: descricaoProdutoRef.current.value, 
        categoriaProduto: categoriaProdutoRef.current.value, 
        estoqueProduto: estoqueProdutoRef.current.value, 
        imagem1Produto: imagem1ProdutoRef.current.files, 
        imagem2Produto: imagem2ProdutoRef.current.files,
    }

    try {
        // Envia os dados para a API
        const response = await fetch('http://localhost:5000/product/register-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
