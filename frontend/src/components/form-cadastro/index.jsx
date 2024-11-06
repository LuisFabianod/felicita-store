import './styles.css'
import React from "react";


export const FormCadastro = () => {

    return(
      <div className='form-cadastro'>
        <form method='POST' action="http://localhost:5000/cadastro/cadastrar-usuario" className='form'>
        <h1>Faça seu cadastro</h1>
            <div className='nome-sobrenome'>
              <input type='text' placeholder='*Nome' name='nome' id='nome'></input>

              <input type='text' placeholder='*Sobrenome' name='sobrenome' id='sobrenome'></input>
            </div>
            <input type="email" placeholder='*Email' name='email' id='email' ></input>

            <div className='senha'>
              <input type='password' placeholder='*Senha' name='password' id='password'></input>

              <input type='password' placeholder='*Confirmar Senha' name='password2' id='password2'></input>
            </div>

            <button type='submit'>Cadastrar</button>

        </form>
      </div>
    )
}