require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const getFormattedDate = require('../utils/getFormattedDate');

// Diretório para armazenar as imagens com base no formato da data e segredo
const imagesDirectory = getFormattedDate() + '_' + process.env.IMG_SECRET;

// Configuração do multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images', imagesDirectory)); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Usar o nome original do arquivo
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'imagem1Produto', maxCount: 1 },
    { name: 'imagem2Produto', maxCount: 1 }
]);

exports.productRegister = async (req, res) => {
    // Caminho completo do diretório de imagens
    const uploadDirectory = path.join(__dirname, '..', 'images', imagesDirectory);

    // Verificar se o diretório existe, se não, criar
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true }); // Cria o diretório de forma recursiva, se necessário
    }

    // Processar o upload dos arquivos
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao processar os arquivos' });
        }

        // Extrair os dados do corpo da requisição
        const { nomeProduto, descricaoProduto, categoriaProduto, precoProduto, estoqueProduto } = req.body;

        // Verificar se todos os campos obrigatórios estão presentes
        if (!nomeProduto || !descricaoProduto || !categoriaProduto || !precoProduto || !estoqueProduto || !req.files) {
            return res.status(400).json({ message: 'Atenção aos campos obrigatórios (marcados com *)' });
        }

        try {
            const formattedCategorys = formatCategorys(categoriaProduto);

            // Criar o produto na base de dados
            await Product.create({
                nome: nomeProduto,
                descricao: descricaoProduto,
                categoria: formattedCategorys,
                preco: precoProduto,
                estoque: estoqueProduto,
                status: estoqueProduto > 0 ? 1 : 0,
                imagens: imagesDirectory, // Armazenar o diretório das imagens
            });

            return res.status(200).json({ message: 'Produto adicionado na base de dados' });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao adicionar produto na base de dados' });
        }
    });
};

// Função para formatar as categorias
const formatCategorys = (categorys) => {
    if (!categorys.includes(',')) return categorys;

    const splitedCategorys = categorys.trim().split(',');

    const formattedCategorys = splitedCategorys.map(category => category.trim());

    return formattedCategorys;
};
