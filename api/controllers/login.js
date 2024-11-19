const User = require('../models/User'); // declaração do model user
const validator = require('validator'); // declaração da biblioteca validator
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt
const jwt = require('jsonwebtoken'); // declaração da biblioteca jwt

// comapara o hash da senha enviada com a da db
const checkEqualPasswords = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword); // compara o hash da senha enviada com o hash da senha na db
    return match; // retorna um bool que indica se as senhas são iguais ou não
};

exports.userLogin = async (req, res) => {
    const { email, password, rememberSession } = req.body; // declaração dos campos enviados pelo form
    try {
        // checa se os campos foram preenchidos
        if (!email) return res.status(400).json({message: 'Email não foi enviado'});
        if (!password) return res.status(400).json({message: 'Senha não foi enviada'});

        // checa se o email enviado é válido
        if (!validator.isEmail(email)) return res.status(400).json({message: 'Email inválido'});

        // procura o usuário pelo email enviado
        const user = await User.findOne({ where: { email } });

        // se não for encontrado nenhum registro com esse email, retorna bad request
        if (!user) return res.status(400).json({message: 'Email ou senha inválidos'});

        // se a senha enviada não for igual a senha da db, retorna bad request
        if (!await checkEqualPasswords(password, user.senha)) {
            return res.status(400).json({message: 'Email ou senha inválidos'});
        }

        // se a checkbox rememberSession estiver marcada, a sessão dura 30 dias, se não, dura 1 hora
        const expiresIn = rememberSession ? '30d' : '1h';

        // declaração do token com a codificação do userId, chave secreta e tempo de expiração
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn });

        // o frontend espera um json como resposta, aqui são enviadas as informações para criação
        // do cookie da sessão, e a rota para redirecionar o usuário
       
        res.status(200).json({ 
            cookieName: 'felicitaToken', // nome do cookie
            cookieValue: token, // o cookie armazena o token
            cookieAge: rememberSession ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // o tempo da sessão é 1 hora ou 30 dias se a checkBox "rememberSession" for marcada
            redirectUrl: 'http://localhost:3000/', // direciona o usuário para página home após o login
            userName: user.nome,
            userEmail: user.email
        });
    } catch (error) {
        return res.status(500).send('Erro no servidor'); // caso algo de errado retorna o erro
    }

};

exports.userLogout = async (req, res) => {
    try {
        return res.status(200).json({
            // no frontend, quando a resposta do servidor for ok, o cookie será apagado
            cookieName: 'felicitaToken', // nome do cookie de login, que vai ser retirado
            redirectUrl: 'http://localhost:3000/', // redireciona o usuário para home
        }); 
    } catch (error) {
        return res.status(500).json({message: 'Erro ao realizar logout'}); // caso algo dê errado retorna o erro
    }

};