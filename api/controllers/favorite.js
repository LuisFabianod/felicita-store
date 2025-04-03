const { User, Product, Favorite } = require('../models');

exports.addFavoriteProduct = async (req, res) => {
    try {
        const { productId, userEmail } = req.body;

        if (!productId || !userEmail) {
            return res.status(400).json({ message: 'Erro ao adicioar produto aos favoritos. 1' });
        }

        const user = await User.findOne({ where: { email: userEmail}});
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const alreadyFavorited = await Favorite.findOne({ where: { userId: user.id, productId } });
        if (alreadyFavorited) {
            return res.status(400).json({ message: 'Produto já está nos favoritos' });
        }
        
        await Favorite.create({ userId: user.id, productId });

        return res.status(201).json({ message: 'Produto adicionado aos favoritos. 2'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao adicionar produto aos favoritos. 3', error: error.message });
    }
};


// POST - Carregar produtos favoritos do usuário
exports.loadFavoriteProducts = async (req, res) => {
    try {
        const { userEmail } = req.body;

        const user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const userWithFavorites = await User.findOne({
            where: { email: userEmail },
            include: {
                model: Product,
                through: { attributes: [] }, 
                attributes: ['id', 'nome', 'descricao', 'preco', 'imagens']
            }
        });

        if (!userWithFavorites || userWithFavorites.Products.length === 0) {
            return res.status(400).json({ message: 'Você não tem produtos favoritos', favoriteProducts: [] });
        }

        return res.status(200).json({ favoriteProducts: userWithFavorites.Products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao carregar favoritos', error: error.message });
    }
};
