const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');

// COMPARA O HASH DA SENHA ENVIADA DO FORM COM O HASH DA DB
const checkEqualPasswords = async (password, hashPassword) => {
    const match = bcrypt.compare(password, hashPassword);
    return match;
};

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    // CHECA SE OS CAMPOS FORAM PREENCHIDOS
    if (!email) return res.status(400).send('Email não foi enviado');
    if (!password) return res.status(400).send('Senha não foi enviada');
    
    // CHECA SE O EMAIL É VÁLIDO
    if (!validator.isEmail(email)) return res.status(400).send('Email inválido');

    try {
        // PROCURA UM USUÁRIO COM O EMAIL (PK) ENVIADO
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send('Usuário não encontrado');
        
        if (!checkEqualPasswords(password, user.senha)) {
            return res.status(400).send('Senha incorreta');
        }
    } catch (error) {
        return res.status(500).send('Erro no servidor');
    }

    return res.status(200).send('Usuário logado!');

};