
// método que será executado toda vez que um usuário acessar a home
exports.index = (req, res) => {
   res.json({ loggedIn: req.isLoggedIn || false}); // responde o front-end dizendo se o usuário está logado ou não
}