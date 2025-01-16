require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const getFormattedDate = require('../utils/getFormattedDate');

exports.productRegister = async (req, res) => {
    // Gerar diretório único para a requisição
    const uniqueDirectory = getFormattedDate() + '_' + process.env.IMG_SECRET;

    // Caminho completo do diretório de imagens
    const uploadDirectory = path.join(__dirname, '..', 'images', uniqueDirectory);

    // Verificar se o diretório existe, se não, criar
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true }); // Cria o diretório de forma recursiva, se necessário
    }

    // Configurar o multer dinamicamente dentro da função
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDirectory); // Define o diretório exclusivo da requisição
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname); // Adiciona um timestamp para evitar sobrescrição
        }
    });

    const upload = multer({ storage }).any(); // Reconfigurado para cada requisição

    // Processar o upload dos arquivos
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao processar os arquivos' });
        }

        const { nomeProduto, descricaoProduto, secaoProduto, precoProduto, precoPromocional,estoqueProduto } = req.body;

        if (!nomeProduto || !descricaoProduto || !secaoProduto || !precoProduto || !precoPromocional || !estoqueProduto) {
            return res.status(400).json({ message: 'Atenção aos campos obrigatórios (marcados com *)' });
        }

        const imagens = req.files;

        if (!imagens || imagens.length === 0) {
            return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
        }

        try {
            await Product.create({
                nome: nomeProduto,
                descricao: descricaoProduto,
                secao: secaoProduto,
                preco: precoProduto,
                precoPromocional,
                estoque: estoqueProduto,
                status: estoqueProduto > 0 ? 1 : 0,
                variacoesTamanho: 1, // TEMPORÁRIO
                tabelaMedidas: { oi: 'oi' }, // TEMPORÁRIO
                imagens: uniqueDirectory, // Salva o diretório único no banco
            });

            return res.status(200).json({ message: 'Produto adicionado na base de dados' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao adicionar produto na base de dados' });
        }
    });
};


exports.loadProducts = async (req, res) => {

    const products = await Product.findAll();

    return res.status(200).json({products, message: 'Olá'});
}

exports.loadImages = async (req, res) => {
    
    const imagesDirectory = path.resolve(__dirname, '../images', 'products',req.params.imagesDirectory);

    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

    let imageNames = [];

    try {
        const files = fs.readdirSync(imagesDirectory);

        imageNames = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageTypes.includes(ext);
        });

        return res.status(200).json({ imageNames });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao carregar imagens', error: error.message });
    }
};