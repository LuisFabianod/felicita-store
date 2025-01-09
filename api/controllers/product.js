require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const getFormattedDate = require('../utils/getFormattedDate');

// Diretório para armazenar todas as imagens
const imagesDirectory = getFormattedDate() + '_' + process.env.IMG_SECRET;  // Diretório único para todas as imagens

// Configuração do multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Diretório único para todas as imagens
        cb(null, path.join(__dirname, '..', 'images', imagesDirectory)); 
    },
    filename: (req, file, cb) => {
        // Usar o nome original do arquivo para garantir a unicidade
        cb(null, Date.now() + '_' + file.originalname); // Adiciona um timestamp para evitar sobrescrição
    }
});

// Usando `multer.any()` para permitir múltiplos arquivos com qualquer nome de campo
const upload = multer({ storage: storage }).any(); 

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
        const { nomeProduto, descricaoProduto, secaoProduto, precoProduto, estoqueProduto } = req.body;
        
        // Verificar se todos os campos obrigatórios estão presentes
        if (!nomeProduto || !descricaoProduto || !secaoProduto || !precoProduto || !estoqueProduto) {
            return res.status(400).json({ message: 'Atenção aos campos obrigatórios (marcados com *)' });
        }

        // Obter o array de imagens enviadas
        const imagens = req.files;

        if (!imagens || imagens.length === 0) {
            return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
        }

        // Criar o produto na base de dados
        try {
            
            // Criar o produto na base de dados
            await Product.create({
                nome: nomeProduto,
                descricao: descricaoProduto,
                secao: secaoProduto,
                preco: precoProduto,
                estoque: estoqueProduto,
                status: estoqueProduto > 0 ? 1 : 0,
                variacoesTamanho: 1, // TEMPORARIO
                tabelaMedidas: {"oi": "oi"}, // TEMPORARIO
                imagens: imagesDirectory, // Armazenar os caminhos das imagens
            });

            return res.status(200).json({ message: 'Produto adicionado na base de dados' });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao adicionar produto na base de dados' });
        }
    });
};
