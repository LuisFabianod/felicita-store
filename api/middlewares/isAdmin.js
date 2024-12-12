const User = require('../models/User'); // declaração do model User

exports.isAdminMiddleware = async (req, res, next) => {    
    try {
        const user = await User.findByPk(req.userId);

        if(!user) res.status(400).json({message: 'Usuário não encontrado.'})

        req.isAdmin = user.isAdmin

        next();
    } catch (err) {

    }
}