const validator = require('validator')


exports.loginUsuario = (req, res) => {
    const { email, password } = req.body
    
    if(!email) res.status(400).send('Email não foi enviado')
    if(!password) res.status(400).send('Senha não foi enviada')

    if(!validator.isEmail(email)) res.status(400).send('Email inválido')

    res.status(200).send(`Usuário com email ${email} e senha ${password} logado com sucesso!`);
}

