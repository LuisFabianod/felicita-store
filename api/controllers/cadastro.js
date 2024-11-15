const User = require('../models/User'); // declaração do model User
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt (vai estar presente na criptorafia da senha)
const { shouldSubmit } = require('../utils/validation'); // declaração da função que valida os dados enviados pelo form
const { nameFormatation } = require('../utils/nameFormatation'); // declaração da função que formata o nome enviado pelo form

const verifyIfUsersAlreadyExists = async (email) => {
  try {
    const usuarioExistente = await User.findOne({ where: { email } }); // busca por um registro com o email passado no form
    return Boolean(usuarioExistente) // retorna true se o usuário existir, false se ele não existir
  } catch (err) {
    throw new Error('Erro ao verificar se o e-mail já está cadastrado.');
  }
}

// CRIPTOGRAFA A SENHA ENVIADA PELO FORM
const hashPassword = async (password) => {
  const saltRounds = 10; // quantidade de vezes que o algoritmo de hashing será aplicado
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // declara a senha criptografada
    return hashedPassword; // retorna a senha criptografada
  } catch (error) {
    console.error("Erro ao gerar hash:", error); // caso algo dê errado, é lançado um erro
  }
};

// função para cadastrar usuário 
exports.userRegister = async (req, res) => {
  const { nome, sobrenome, email, password, password2 } = req.body; // declaração dos valores enviados pelo formulário
  try {

    if (await verifyIfUsersAlreadyExists(email)) {
      return res.status(400).json({message: 'Esse e-mail já está cadastrado!'}); // caso o email já esteja registrado na db, retorna um erro
    }

    const validation = shouldSubmit(nome, sobrenome, email, password, password2); // declara a chamada da função que valida os valores

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors }); // se no retorno da função for {isValid: false}, a resposta será os erros que foram cometidos
    }

    const hashedPassword = await hashPassword(password); // declaração da chamada da função que criptografa a senha

    // declaração do método create (adiciona o usuário à db) com os campos enviados pelo form
    const novoUsuario = await User.create({ nome: nameFormatation(nome) + ' ' + nameFormatation(sobrenome), email, senha: hashedPassword });
    res.redirect('http://localhost:3000/'); // responde com sucesso

  } catch (erro) {
    res.status(500).json({message: erro.message || 'Erro ao cadastrar usuário.'}); // caso algo dê errado, responde com erro
  }

  
}

