export const searchProducts = async (searchValue, setProducts, setIsLoading, setApiMessage) => {
    try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/product/search-products', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchValue }),
        });

        const data = await response.json();

        if (response.ok) {
            setProducts(data.matchedProducts || []); // Garante array
            setApiMessage(data.message || null);
        } else {
            setProducts([]); // Garante que products não fique undefined
            setApiMessage(data.message || 'Erro ao buscar produtos.');
        }
    } catch (error) {
        console.error(error);
        setProducts([]);
        setApiMessage('Erro ao enviar dados. Verifique sua conexão.');
    } finally {
        setIsLoading(false);
    }
};
