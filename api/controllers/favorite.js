const Favorite = require('../models/Favorite');
const Product = require('../models/Product');

exports.addFavoriteProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const productExists = await Product.findByPk(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const alreadyFavorited = await Favorite.findOne({ where: { userId, productId } });
        if (alreadyFavorited) {
            return res.status(400).json({ message: 'Produto já está nos favoritos' });
        }
        
        await Favorite.create({ userId, productId });

        return res.status(200).json({ message: 'Produto adicionado aos favoritos'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao adicionar produto aos favoritos', error: error.message });
    }
};


// GET - Carregar produtos favoritos do usuário
exports.loadFavoriteProducts = async (req, res) => {
    try {
        const { userId } = req.body;

        const favoriteProducts = await Favorite.findAll({
            where: { userId },
            include: {
                model: Product,  
                attributes: ['id', 'nome', 'descricao', 'preco', 'imagens'] 
            }
        });

        if (favoriteProducts.length === 0) {
            return res.status(400).json({ message: 'Você não tem produtos favoritos', favoriteProducts: [] });
        }

        return res.status(200).json({ favoriteProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao carregar favoritos', error: error.message });
    }
};
