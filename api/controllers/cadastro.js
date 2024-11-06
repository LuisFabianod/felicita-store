
exports.cadastrarUsuario = (req, res) => {
    const {username} = req.body;

    if(!username){
        return res.status(400).send('Username é obrigatório')
    }

    console.log('usuario cadastrado')

    res.status(200).send(`Usuário ${username} cadastrado com sucesso!`);
}