import './styles.css'
import React from "react";


export const FormLogin = () => {

    return(
      <div className='form-login'>
        <form method='POST' action="http://localhost:5000/login/login-usuario" className='form'>
        <h1>Faça seu login</h1>
            
            <input type="email" placeholder='*Email' name='email' id='email' ></input>

            <input type='password' placeholder='*Senha' name='password' id='password'></input>

            <button type='submit'>Fazer login</button>

      
        </form>
      </div>
    )
}