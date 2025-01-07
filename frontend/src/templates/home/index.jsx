import { LoadingSpinner } from '../../components/Loading';
import { IsLoadingContext } from '../../Contexts/IsLoading';
import './styles.css'
import React, { useContext } from "react";


export const Home = () => {

    const { isLoading } = useContext(IsLoadingContext);

    return(
        <>
       {isLoading && 
        <LoadingSpinner/>
       }  
        <div>oi <div>oi</div></div>
        </>
    )
}