require('dotenv').config();
const Product = require('../models/Product');
const createImageDirectory = require('../utils/createImageDirectory')

exports.productRegister = async (req, res) => {
    const { nomeProduto,
        descricaoProduto,
        categoriaProduto,
        precoProduto,
        estoqueProduto,
        imagem1Produto,
        imagem2Produto } = req.body

        console.log(imagem1Produto)
    if(!nomeProduto ||
        !descricaoProduto ||
        !categoriaProduto ||
        !precoProduto ||
        !estoqueProduto ||
        !imagem1Produto ||
        !imagem2Produto){
            return res.status(400).json({message: 'Atenção aos campos obrigatórios (marcados com *)'})
        }

    try {
        const imagesDirectory = await createImageDirectory(imagem1Produto, imagem2Produto);
        

        const formattedCategorys = formatCategorys(categoriaProduto);

        await Product.create({
            nome: nomeProduto,
            descricao: descricaoProduto,
            categoria: formattedCategorys,
            preco: precoProduto,
            estoque: estoqueProduto,
            status: estoqueProduto > 0 ? 1 : 0,
            imagens: imagesDirectory,
        })

        return res.status(200).json({message: 'Produto adicionado na base de dados'})

    }catch(err){
        console.error(err)
       return res.status(500).json({message: 'Erro ao adicionar produto na base de dados'})
    }
    
}

const formatCategorys = (categorys) => {
    if (!categorys.includes(',')) return categorys;

    const splitedCategorys = categorys.trim().split(',');

    const formattedCategorys = splitedCategorys.map(category => category.trim());

    return formattedCategorys;
}

