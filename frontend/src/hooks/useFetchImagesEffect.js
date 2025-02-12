import { useEffect } from "react"; 

export const useFetchImagesEffect = (product, setImages) => {
    useEffect(() => {
        if (!product || !product.imagens) return; // Verifica se product e product.imagens existem

        const fetchImages = async () => {
            const response = await fetch(`http://localhost:5000/product/images/${product.imagens}`, {
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