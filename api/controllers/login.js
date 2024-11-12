const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// COMPARA O HASH DA SENHA ENVIADA DO FORM COM O HASH DA DB
const checkEqualPasswords = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
};

exports.userLogin = async (req, res) => {
    const { email, password, rememberSession } = req.body;

    // CHECA SE OS CAMPOS FORAM PREENCHIDOS
    if (!email) return res.status(400).send('Email não foi enviado');
    if (!password) return res.status(400).send('Senha não foi enviada');
    
    // CHECA SE O EMAIL É VÁLIDO
    if (!validator.isEmail(email)) return res.status(400).send('Email inválido');

    try {
        // PROCURA UM USUÁRIO COM O EMAIL (PK) ENVIADO
        const user = await User.findOne({ where: { email } });

        // SE O EMAIL NÃO ESTIVER NA DB, RETORNA BAD REQUEST
        if (!user) return res.status(400).send('Usuário não encontrado');
        
        // SE AS SENHAS NÃO FOREM IGUAIS, RETORNA BAD REQUEST
        if (!await checkEqualPasswords(password, user.senha)) {
            return res.status(400).send('Senha incorreta');
        }

        // SE A CHECKBOX rememberSession ESTIVER MARCADA, A SESSÃO DURA 30 DIAS, SE NÃO, DURA 1 HORA
        const expiresIn = rememberSession? '30d' : '1h';

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn });
        
        res.cookie('token', token, {      
            maxAge: rememberSession ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, 
        });

        return res.status(200).send('Usuário logado!');
    } catch (error) {
        return res.status(500).send('Erro no servidor');
    }   

};