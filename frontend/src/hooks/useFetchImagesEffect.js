import { useEffect } from "react"; 
const BACK_END = process.env.REACT_APP_BACK_END;

export const useFetchImagesEffect = (product, setImages) => {

    useEffect(() => {
        if (!product || !product.imagens) return; // Verifica se product e product.imagens existem

        const fetchImages = async () => {
            const response = await fetch(`${BACK_END}/product/images/${product.imagens}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setImages(data.imageNames);
            } else {
                console.error('Erro ao carregar as imagens', response);
            }
        };

        fetchImages();
    }, [product?.imagens, product, setImages]);
}