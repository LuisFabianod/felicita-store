const User = require('../models/User'); // declaração do model User
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt (vai estar presente na criptorafia da senha)
const { shouldSubmit } = require('../utils/validation'); // declaração da função que valida os dados enviados pelo form
const { nameFormatation } = require('../utils/nameFormatation'); // declaração da função que formata o nome enviado pelo form

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
exports.userRegister = (req, res) => {
    const { nome, sobrenome, email, password, password2 } = req.body; // declaração dos valores enviados pelo formulário

    const validation = shouldSubmit(nome, sobrenome, email, password, password2); // declara a chamada da função que valida os valores

    if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors }); // se no retorno da função for {isValid: false}, a resposta será os erros que foram cometidos
    }
    
    nameFormatation(nome, sobrenome); // caso o retorno da função for {isValid: true}, a função que formata o nome é chamada

    // função que adiciona o usuário na db
    const criarUsuario = async () => {
        const hashedPassword = await hashPassword(password); // declaração da chamada da função que criptografa a senha
        try {
            // declaração do método create (adiciona o usuário à db) com os campos enviados pelo form
            const novoUsuario = await User.create({ nome: nome + ' ' + sobrenome, email, senha: hashedPassword }); 
            res.status(201).send(`Usuário ${novoUsuario.nome} cadastrado com sucesso!`); // responde com sucesso
        } catch (erro) {
            res.status(500).send('Erro ao cadastrar usuário.'); // caso algo dê errado, responde com erro
        }
    }

    criarUsuario(); // chama a função criar usuário, pois nessa parte do código os campos foram validados
}

