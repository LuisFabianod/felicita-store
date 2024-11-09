const validator = require('validator');
const User = require('../models/User');

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email) return res.status(400).send('Email não foi enviado');
    if (!password) return res.status(400).send('Senha não foi enviada');
    
    if (!validator.isEmail(email)) return res.status(400).send('Email inválido');

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send('Usuário não encontrado');
    
        if (password == user.senha) {
            return res.status(200).send('Usuário logado!');
        } else {
            return res.status(400).send('Senha incorreta');
        }
    } catch (error) {
        return res.status(500).send('Erro no servidor');
    }
};