const User = require('../models/User');
const bcrypt = require('bcrypt');
const { shouldSubmit } = require('../utils/validation');
const { nameFormatation } = require('../utils/nameFormatation');

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

exports.userRegister = (req, res) => {
    const { nome, sobrenome, email, password, password2 } = req.body;

    const validation = shouldSubmit(nome, sobrenome, email, password, password2);

    if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
    }
    
    nameFormatation(nome, sobrenome)

    // FAZ O HASH DA SENHA ENVIADA E SOBE USUÁRIO PARA DB 
    const criarUsuario = async () => {
        const hashedPassword = await hashPassword(password);
        try {
            // CRIA NOVA INSTÂNCIA DE USER NA DB
            const novoUsuario = await User.create({ nome: nome + ' ' + sobrenome, email, senha: hashedPassword });
            res.status(201).send(`Usuário ${novoUsuario.nome} cadastrado com sucesso!`);
        } catch (erro) {
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    }

    criarUsuario();
}

