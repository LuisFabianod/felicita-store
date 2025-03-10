import { useEffect } from "react"; 


export const useFetchProductsEffect = (setIsLoading, loadProducts, setApiMessage, setProducts) => {
        useEffect(() => {
        // Função assíncrona para carregar produtos
        const fetchProducts = async () => {
            setIsLoading(true); // Começa o carregamento
            await loadProducts(setIsLoading, setApiMessage, setProducts);
        };

        fetchProducts();
    }, [setIsLoading, loadProducts, setApiMessage, setProducts]);
}