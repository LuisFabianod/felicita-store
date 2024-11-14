const User = require('../models/User'); // declaração do model user
const validator = require('validator'); // declaração da biblioteca validator
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt
const jwt = require('jsonwebtoken'); // declaração da biblioteca jwt

// comapara o hash da senha enviada com a da db
const checkEqualPasswords = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    return match;
};

exports.userLogin = async (req, res) => {
    const { email, password, rememberSession } = req.body; // declaração dos campos enviados pelo form
    try {
        // checa se os campos foram preenchidos
        if (!email) return res.status(400).send('Email não foi enviado');
        if (!password) return res.status(400).send('Senha não foi enviada');

        // checa se o email enviado é válido
        if (!validator.isEmail(email)) return res.status(400).send('Email inválido');

        // procura o usuário pelo email enviado
        const user = await User.findOne({ where: { email } });

        // se não for encontrado nenhum registro com esse email, retorna bad request
        if (!user) return res.status(400).send('Email ou senha inválidos');

        // se a senha enviada não for igual a senha da db, retorna bad request
        if (!await checkEqualPasswords(password, user.senha)) {
            return res.status(400).send('Email ou senha inválidos');
        }

        // se a checkbox rememberSession estiver marcada, a sessão dura 30 dias, se não, dura 1 hora
        const expiresIn = rememberSession ? '30d' : '1h';

        // declaração do token com a codificação do userId, chave secreta e tempo de expiração
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn });

        // criação de um cookie com o nome token, que vai ter o valor de token, e vai expirar junto com o token
        res.cookie('token', token, {
            maxAge: rememberSession ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
        });

        return res.status(200).send('Usuário logado!'); // retorna sucesso
    } catch (error) {
        return res.status(500).send('Erro no servidor'); // caso algo de errado retorna o erro
    }

};

exports.userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).send('Logout realizado com sucesso');
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        return res.status(500).send('Erro ao realizar logout');
    }

};