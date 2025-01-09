const User = require('../models/User'); // declaração do model User

exports.isAdminMiddleware = async (req, res, next) => {    
    try {
        
        if(req.session.isAdmin === undefined){
            const user = await User.findByPk(req.userId);

            if(!user) res.status(400).json({message: 'Usuário não encontrado.'})

            req.session.isAdmin = user.isAdmin
        }
        
        req.isAdmin = req.session.isAdmin

        next();
    } catch (err) {
        console.error(err);  

        res.status(500).json({ message: 'Erro no servidor.' });
    }
}