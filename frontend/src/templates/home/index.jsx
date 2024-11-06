import './styles.css'
import React from "react";
import { Link } from 'react-router-dom';


export const Home = () => {

    return(
        <>
        <h1>OI</h1>
        <Link to="/auth">Fazer login</Link>
        </>
    )
}