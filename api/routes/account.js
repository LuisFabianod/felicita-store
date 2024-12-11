const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const accountController = require('../controllers/user'); // declaração do controller do cadastro

// cria uma rota de post que utiliza o método userRegister do cadastroController
router.post('/register-user', accountController.userRegister)

// cria uma rota de post que controla o login do usuário
router.post('/login-user', accountController.userLogin)

// cria uma rota de post que controla o logout do usuário
router.post('/logout', accountController.userLogout)

// rota de put que controla a edição dos dados do usuário
router.put('/update', accountController.userUpdate)

// rota de delete que controla a exclusão do usuário
router.delete('/delete', accountController.userDelete)

// rota de post que controla a verificação de e-mail do usuário e cadastro na db
router.post('/verify-email', accountController.verifyEmail)

router.post('/forgot-password', accountController.forgotPassword)

router.post('/reset-password', accountController.resetPassword)


module.exports = router; // exporta as rotas do arquivo