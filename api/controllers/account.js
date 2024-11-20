const User = require('../models/User'); // declaração do model User
const validator = require('validator'); // declaração da biblioteca validator
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt (vai estar presente na criptorafia da senha)
const jwt = require('jsonwebtoken'); // declaração da biblioteca jwt
const { shouldSubmit } = require('../utils/validation'); // declaração da função que valida os dados enviados pelo form
const { nameFormatation } = require('../utils/nameFormatation'); // declaração da função que formata o nome enviado pelo form

const verifyIfUsersAlreadyExists = async (email) => {
  try {
    const usuarioExistente = await User.findOne({ where: { email: email } }); // busca por um registro com o email passado no form
    return Boolean(usuarioExistente) // retorna true se o usuário existir, false se ele não existir
  } catch (err) {
    throw new Error('Erro ao verificar se o e-mail já está cadastrado.');
  }
}

// comapara o hash da senha enviada com a da db
const checkEqualPasswords = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword); // compara o hash da senha enviada com o hash da senha na db
  return match; // retorna um bool que indica se as senhas são iguais ou não
};

// CRIPTOGRAFA A SENHA ENVIADA PELO FORM
const hashPassword = async (password) => {
  const saltRounds = 10; // quantidade de vezes que o algoritmo de hashing será aplicado
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // declara a senha criptografada
    return hashedPassword; // retorna a senha criptografada
  } catch (error) {
    throw new Error('Erro ao gerar hash da senha');  // caso algo dê errado, é lançado um erro
  }
};

// função para cadastrar usuário 
exports.userRegister = async (req, res) => {
  const { nome, sobrenome, email, password, password2 } = req.body; // declaração dos valores enviados pelo formulário
  try {
    if (await verifyIfUsersAlreadyExists(email)) {
      return res.status(400).json({ message: 'Esse e-mail já está cadastrado!' }); // caso o email já esteja registrado na db, retorna um erro
    }
    const validation = shouldSubmit(nome, sobrenome, email, password, password2); // declara a chamada da função que valida os valores
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors }); // se no retorno da função for {isValid: false}, a resposta será os erros que foram cometidos
    }

    const hashedPassword = await hashPassword(password); // declaração da chamada da função que criptografa a senha

    // declaração do método create (adiciona o usuário à db) com os campos enviados pelo form
    await User.create({ nome: nameFormatation(nome) + ' ' + nameFormatation(sobrenome), email, senha: hashedPassword });

    res.json({ message: 'Usuário cadastrado com sucesso!' })

  } catch (erro) {
    res.status(500).json({ message: erro.message || 'Erro ao cadastrar usuário.' }); // caso algo dê errado, responde com erro
  }

}

exports.userLogin = async (req, res) => {
  const { email, password, rememberSession } = req.body; // declaração dos campos enviados pelo form
  try {
    // checa se os campos foram preenchidos
    if (!email) return res.status(400).json({ message: 'Email não foi enviado' });
    if (!password) return res.status(400).json({ message: 'Senha não foi enviada' });

    // checa se o email enviado é válido
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email inválido' });

    // procura o usuário pelo email enviado
    const user = await User.findOne({ where: { email } });

    // se não for encontrado nenhum registro com esse email, retorna bad request
    if (!user) return res.status(400).json({ message: 'Email ou senha inválidos' });

    // se a senha enviada não for igual a senha da db, retorna bad request
    if (!await checkEqualPasswords(password, user.senha)) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
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
    return res.status(500).json({ message: 'Erro ao realizar logout' }); // caso algo dê errado retorna o erro
  }
};

exports.userUpdate = async (req, res) => {
  const { newName, newEmail, actualEmail } = req.body;

  try {
    if (!newName || !newEmail || !actualEmail) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Atualiza os dados do usuário diretamente
    const updated = await User.update(
      { nome: newName, email: newEmail }, // campos para atualizar
      { where: { email: actualEmail } }  // condição para encontrar o usuário
    );

    if (!updated) {
      // Se não encontrou o usuário para atualizar
      return res.status(404).json({ message: 'Usuário não encontrado.' });
   }

   return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });

  }catch(error){
    res.json({message: 'Erro ao atualizar dados do usuário'})
  }

}