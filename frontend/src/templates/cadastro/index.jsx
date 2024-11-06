import './styles.css'
import React from "react";


export const Cadastro = () => {

    return(
        <form method='POST' action="http://localhost:5000/cadastro/cadastrar-usuario">
            <label for="username" >Nome</label>
            <input type="text" name="username" id="iusername" placeholder='Usuário'/>
            <button className='send-username'>Enviar</button>
        </form>

    )
}