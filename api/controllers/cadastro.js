const validator = require('validator')

exports.cadastrarUsuario = (req, res) => {
    const {nome, sobrenome, email, password, password2} = req.body;

    if(!nome || !sobrenome || !email || !password || !password2){
        return res.status(400).send('Todos os campos são obrigatórios')
    }

    if(!validator.isEmail(email)){
        return res.status(400).send('Email inválido!')
    }

    if(password !== password2){
        return res.status(400).send('As senhas devem ser iguais')
    }

    return res.status(200).send(`Usuário ${nome} cadastrado com sucesso!`)

}

