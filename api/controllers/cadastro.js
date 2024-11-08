const validator = require('validator')

exports.cadastrarUsuario = (req, res) => {
    const { nome, sobrenome, email, password, password2 } = req.body;

    if (!nome || !sobrenome || !email || !password || !password2) {
        return res.status(400).send('Todos os campos são obrigatórios')
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send('Email inválido!')
    }

    if (password !== password2) {
        return res.status(400).send('As senhas devem ser iguais')
    }

//    criarUsuario();

//    const criarUsuario = async () => {
//        try {
//           const novoUsuario = await User.create({ nome, email, senha });
//         res.status(201).send(`Usuário ${novoUsuario.nome} cadastrado com sucesso!`);
//      } catch (erro) {
 //           res.status(500).send('Erro ao cadastrar usuário.');
   //     }
    //}
}

