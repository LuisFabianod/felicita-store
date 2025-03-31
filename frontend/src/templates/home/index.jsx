import './styles.css'
import React, { useContext, useState, useEffect } from "react";
import { CarouselSlider } from '../../components/CarouselSlider';
import { LoadingSpinner } from '../../components/Loading';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import { getImagesDirectory } from './api/getImagesDirectory';
import { ProductScroller } from '../../components/ProductScroller';
import { useFetchProductsEffect } from '../../hooks/useFetchProductsEffect';
import { loadProducts } from './api/loadProducts';

export const Home = () => {

    const { isLoading, setIsLoading } = useContext(IsLoadingContext);

    const [ apiMessage, setApiMessage ] = useState('');

    const [ layoutConfig, setLayoutConfig ] = useState({});

    const [ products, setProducts ] = useState([]);

    const [ images, setImages ] = useState([]); 

    useEffect( () => {

            const fetchImages = async () => {
                    
                await getImagesDirectory(setApiMessage, setIsLoading, setLayoutConfig);
                if(!layoutConfig.imagens) return 
                const response = await fetch(`http://localhost:5000/layout-config/images/${layoutConfig.imagens}`, {
                    method: 'GET',
                   
                });
    
                if (response.ok) {
                    const data = await response.json(); 
                    setImages(data.imageNames)
                } else {
                    console.error('Erro ao carregar as imagens', response);
                }
            };
            
            fetchImages();
        }, [layoutConfig.imagens, setIsLoading]);

        useFetchProductsEffect(setIsLoading, loadProducts, setApiMessage, setProducts)
    

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  
       
       <CarouselSlider images={images} url={`http://localhost:5000/images/home/${layoutConfig.imagens}`} width={'100vw'} maxHeight={'700px'}/>
       <div className='section-title'>
        <h1>PRODUTOS</h1>
       </div>
        <ProductScroller products={products}/>

        </>
    )
}