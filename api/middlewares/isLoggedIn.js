const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    // Obtém o token JWT do cookie
    const token = req.cookies.token;
    
    // Verifica se o token existe
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado. Faça login.' });
    }
    
    try {
        // Verifica e decodifica o token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verifica se o token tem a estrutura correta (userId)
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Token inválido. Faça login novamente.' });
        }
        
        // Adiciona os dados decodificados do token ao objeto de requisição
        req.userId = decoded.userId;
        
        // Cria uma flag na requisição para saber se o usuário está logado
        req.isLoggedIn = true

        // Passa o controle para o próximo middleware ou rota
        next();
    } catch (err) {
        // Token inválido ou expirado
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
}