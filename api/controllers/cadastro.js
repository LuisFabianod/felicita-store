const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt')

// CRIPTOGRAFA A SENHA ENVIADA PELO FORM
const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Erro ao gerar hash:", error);
    }
  };

exports.cadastrarUsuario = (req, res) => {
    const { nome, sobrenome, email, password, password2 } = req.body;

    // CHECA SE OS CAMPOS FORAM PREENCHIDOS
    if (!nome || !sobrenome || !email || !password || !password2) {
        return res.status(400).send('Todos os campos são obrigatórios')
    }

    
 // CHECA SE O EMAIL É VÁLIDO
    if (!validator.isEmail(email)) {
        return res.status(400).send('Email inválido!')
    }

    if (password !== password2) {
        return res.status(400).send('As senhas devem ser iguais')
    }

    const criarUsuario = async () => {
        const hashedPassword = await hashPassword(password); 
        try {
            // CRIA NOVA INSTÂNCIA DE USER NA DB
            const novoUsuario = await User.create({ nome: nome + sobrenome, email, senha: hashedPassword });
            res.status(201).send(`Usuário ${novoUsuario.nome} cadastrado com sucesso!`);
        } catch (erro) {
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    }

    criarUsuario();
}

