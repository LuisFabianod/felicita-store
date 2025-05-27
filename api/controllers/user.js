const User = require('../models/User'); // declaração do model User
const validator = require('validator'); // declaração da biblioteca validator
const bcrypt = require('bcrypt'); // declaração da biblioteca bcrypt (vai estar presente na criptorafia da senha)
const jwt = require('jsonwebtoken'); // declaração da biblioteca jwt
const { shouldSubmit, checkEmail, checkPassword } = require('../utils/validation'); // declaração da função que valida os dados enviados pelo form
const  nameFormatation  = require('../utils/nameFormatation'); // declaração da função que formata o nome enviado pelo form

const sendEmail = require('../utils/sendEmail'); // declaração da função que envia e-mails para o usuário

// verifica se usuário com email enviado já existe na db
const verifyIfUsersAlreadyExists = async (email) => {
  const usuarioExistente = await User.findOne({ where: { email: email } }); // busca por um registro com o email passado no form
  return Boolean(usuarioExistente) // retorna true se o usuário existir, false se ele não existir
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
    const hashedPassword = await bcrypt.hash(password, saltRounds);  //  faz a criptografia da senha
    return hashedPassword; // retorna a senha criptografada
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' })  // caso algo dê errado, é lançado um erro
  }
};


// POST 
exports.verifyEmail = async (req, res, next) => {
  const { nome, sobrenome, email, password, password2, termsCheck } = req.body; // declaração dos valores enviados pelo formulário

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // criação de um código aleatório para verificação de e-mail

  if (await verifyIfUsersAlreadyExists(email)) {
    return res.status(400).json({ message: 'Esse e-mail já está cadastrado!' }); // caso o email já esteja registrado na db, retorna um erro
  }

  const validation = shouldSubmit(nome, sobrenome, email, password, password2); // declara a chamada da função que valida os valores

  if (!termsCheck) {
    return res.status(400).json({ message: 'É preciso aceitar os Termos de uso e as Políticas de Privacidade para se cadastrar' })
  }

  if (!validation.isValid) {
    return res.status(400).json({ message: validation.errors }); // se no retorno da função for {isValid: false}, a resposta será os erros que foram cometidos
  }

  const hashedPassword = await hashPassword(password); // declaração da chamada da função que criptografa a senha

  // Salva os dados enviados em uma sessão, para que não se percam na próxima requisição (que virá com código de verificação)
  req.session.nome = nome;
  req.session.sobrenome = sobrenome;
  req.session.email = email;
  req.session.hashedPassword = hashedPassword;
  req.session.verificationCode = verificationCode;

  const subject = 'Verifique sua conta Felicita Store'

  const content = { verificationCode, userName: nome }

  await sendEmail(email, subject, content);

  return res.status(200).json({ message: `Você está a um passo de criar sua conta! Enviamos um código para ${email} (Válido por 1 hora)` });
}

// POST 
exports.userLogin = async (req, res) => {
  const { email, password, rememberSession, recentlyRegistered } = req.body; // declaração dos campos enviados pelo form
  try {
    // checa se os campos foram preenchidos
    if (!email) return res.status(400).json({ message: 'Email não foi enviado' });
    if (!password) return res.status(400).json({ message: 'Senha não foi enviada' });

    // checa se o email enviado é válido
    if (!validator.isEmail(email)) return res.status(400).json({ message: 'Email inválido' });

    // procura o usuário pelo email enviado
    const user = await User.findOne({ where: { email } });

    // se não for encontrado nenhum registro com esse email, retorna bad request
    if (!user) return res.status(400).json({ message: 'Esse email não está cadastrado' });

    if (!recentlyRegistered) {
      // se a senha enviada não for igual a senha da db, retorna bad request
      if (!await checkEqualPasswords(password, user.senha)) {
        return res.status(400).json({ message: 'Email ou senha inválidos' });
      }
    }

    // se a checkbox rememberSession estiver marcada, a sessão dura 30 dias, se não, dura 1 hora
    const expiresIn = rememberSession ? '30d' : '1d';

    // declaração do token com a codificação do userId, chave secreta e tempo de expiração
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn });

    // aqui são enviadas as informações para criação do cookie da sessão, e a rota para redirecionar o usuário
    res.status(200).json({
      cookieName: 'felicitaToken', // nome do cookie
      cookieValue: token, // o cookie armazena o token
      cookieAge: rememberSession ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // o tempo da sessão é 1 hora ou 30 dias se a checkBox "rememberSession" for marcada
      redirectUrl: 'http://localhost:3000/', // direciona o usuário para página home após o login
      userName: user.nome, // envia o nome do usuário que entrou, será salvo no localStorage
      userEmail: user.email // envia o email do usuário que entrou, será salvo no localStorage
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro no servidor' }); // caso algo de errado retorna o erro
  }
};

// POST
exports.userLogout = async (req, res) => {
  try {

    req.session.isAdmin = undefined;

    return res.status(200).json({
      // no frontend, quando a resposta do servidor for ok, o cookie será apagado
      cookieName: 'felicitaToken', // nome do cookie que vai ser retirado
      redirectUrl: 'http://localhost:3000/', // redireciona o usuário para home
    });

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao realizar logout' }); // caso algo dê errado retorna o erro
  }
};

// PUT
exports.userUpdate = async (req, res) => {
  const { newName, newEmail, newPassword, actualEmail, actualPassword } = req.body; // declaração dos valores enviados pelo form, e do email salvo no localStorage
  // Existem 3 tipos de updates: dados simples, e-mail e senha. Eles são separados por if's nessa parte do código

  // Se chegar newName no req.body, se trata de update de dados simples
  try {

    if (newName) {
      const newFormattedName = nameFormatation(newName);
      
      const user = await User.findOne({where: {email: actualEmail}});

      if(newFormattedName === user.nome){
        return res.status(404).json({ message: 'Esse já é o seu nome' }); 
      }

      const updated = await User.update(
        { nome: newFormattedName }, // campos recebem valores atualizados
        { where: { email: actualEmail } }  // condição para encontrar o usuário
      );

      if (!updated) {
        return res.status(404).json({ message: 'Usuário não encontrado.' }); 
      }

      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' }); 
    
    }

    // Se chegar newEmail no req.body, se trata de update de email
    if (newEmail) {
      const errors = checkEmail(newEmail) // a constante errors retorna true se o erro existir
      if (errors.length >= 1) return res.status(400).json({ message: errors }); // exibição dos erros na tela

      // procura o usuário pelo email salvo no localStorage
      const user = await User.findOne({ where: { email: actualEmail } });

      if(newEmail === user.email){
        return res.status(404).json({ message: 'Esse já é o seu e-mail' }); 
      }

      const userNewEmail = await User.findOne({ where: { email: newEmail } });

      if(userNewEmail){
        return res.status(404).json({ message: 'Esse e-mail já pertence a uma conta' });
      }

      // se a senha enviada não for igual a senha da db, retorna bad request
      if (!await checkEqualPasswords(actualPassword, user.senha)) {
        return res.status(400).json({ message: 'Senha incorreta' });
      }

      const updated = await User.update(
        { email: newEmail }, // campos recebem valores atualizados
        { where: { email: actualEmail } }  // condição para encontrar o usuário
      );

      if (!updated) {
        return res.status(404).json({ message: 'Usuário não encontrado.' }); // caso usuário não seja encontrado
      }

      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' }); // caso seja atualizado com sucesso
    }

    // Se chegar newPassword no req.body, se trata de update de senha
    if (newPassword) {
      const errors = checkPassword(newPassword)  // a constante errors retorna true se o erro existir
      if (errors.length >= 1) return res.status(400).json({ message: errors.join(' ') }); // exibição dos erros na tela

      const hashNewPassword = await hashPassword(newPassword); // faz a criptografia da nova senha
      const updated = await User.update(
        { senha: hashNewPassword }, // campos recebem valores atualizados
        { where: { email: actualEmail } }  // condição para encontrar o usuário
      );

      if (!updated) {
        return res.status(404).json({ message: 'Usuário não encontrado.' }); // caso usuário não seja encontrado
      }

      return res.status(200).json({ message: 'Usuário atualizado com sucesso.' }); // caso seja atualizado com sucesso
    }

  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar dados do usuário' }); // caso dê algum erro na requisição
  }

}

// DELETE
exports.userDelete = async (req, res) => {
  try {
    const { userEmail } = req.body; // email atual do usuário
    const deletedUser = await User.destroy({ where: { email: userEmail } }); // deleta o usuário, se ele não for encontrado, deletedUser terá um valor falsy

    if (!deletedUser) res.status(400).json({ message: 'Usuário não encontrado' }); // caso usuário não seja encontrado

    return res.status(200).json({
      message: 'Usuário excluído com sucesso.',
      redirectUrl: 'http://localhost:3000/', // redirecionar usuário para rota da home
      cookieName: 'felicitaToken', // nome do cookie que vai ser retirado }); // caso seja atualizado com sucesso
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário' }); // caso dê algum erro na requisição
  }
}

// POST 
exports.userRegister = async (req, res, next) => {
  const { userVerificationCode } = req.body; 

  const nome = req.session.nome;
  const sobrenome = req.session.sobrenome;
  const email = req.session.email
  const hashedPassword = req.session.hashedPassword
  const storedCode = req.session.verificationCode

  // VERIFICA SE O CÓDIGO ENVIADO PELO USUÁRIO É O MESMO ENVIADO PELA ROTA userRegister)
  // SE SIM, CADASTRA O USUÁRIO NA DB
  if (storedCode === userVerificationCode) {
    await User.create({ nome: nameFormatation(nome) + ' ' + nameFormatation(sobrenome), email, senha: hashedPassword });  // declaração do método create (adiciona o usuário à db) com os campos enviados pelo form
    
      req.body = {
        email,
        password: hashedPassword,
        recentlyRegistered: true
      }
      
      next();

  } else {
    return res.status(400).json({ message: 'O código está incorreto ou expirado' }); // responde com bad request
  }

}

exports.forgotPassword = async (req, res) => {
  const { userEmail } = req.body; // e-mail do usuário

  const user = await User.findOne({ where: { email: userEmail } }); // busca o usuário com o e-mail usuário

  if (!user) {
    return res.status(400).json({ message: 'Esse e-mail não está cadastrado' }); // responde com bad request se o e-mail não estiver registrado
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // cria o token que vai guardar o id do usuário (vai ser usado na troca de senha)

  const subject = 'Redefinição de senha para sua conta FelicitaStore'; // Título do e-mail 

  const content = { token };

  sendEmail(userEmail, subject, content);
  res.status(200).json({ message: `Um e-mail foi enviado para ${userEmail}, confira sua caixa de entrada` }); // responde com bad request
}

exports.resetPassword = async (req, res) => {
  const { newPassword, token } = req.body; // nova senha e token com id do usuário

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodificação do token

    const hashNewPassword = await hashPassword(newPassword); // criptografia da nova senha 

    const [updated] = await User.update( // atualização no banco de dados
      { senha: hashNewPassword }, // campos recebem valores atualizados
      { where: { id: decoded.userId } }  // condição para encontrar o usuário
    );

    if (updated === 0) {
      return res.status(400).json({ message: 'Token expirado, tente novamente' }); // retorna com erro 
    }

    return res.status(200).json({ message: `Senha atualizada!` }); // responde com sucesso
  } catch (err) {
    return res.status(500).json({ message: 'Erro no servidor' }); // retorna com erro
  }

}