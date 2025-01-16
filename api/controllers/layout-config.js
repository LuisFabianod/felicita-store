const LayoutConfig = require('../models/LayoutConfig');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const getFormattedDate = require('../utils/getFormattedDate');

// GET
exports.loadLayout = async (req, res) => {

  const layoutConfig = await LayoutConfig.findOne({ where: { id: 1 } });

  return res.status(200).json({ layoutConfig });
}

// PUT
exports.layoutUpdate = async (req, res) => {

  try {

    const uniqueDirectory = getFormattedDate() + '_' + process.env.LAYOUT_IMG_SECRET;

    const uploadDirectory = path.join(__dirname, '..', 'images', 'home', uniqueDirectory);

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

    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao processar os arquivos' });
      }

      const images = req.files;

      if (!images || images.length === 0) {
        return res.status(400).json({ message: `imagens: ${images}` });
      }

      await LayoutConfig.update(
        { imagens: uniqueDirectory },
        { where: { id: 1 } }  
      );

      return res.status(200).json({ message: 'Configurações atualizadas com sucesso.' }); // caso seja atualizado com sucesso

    });


  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar configurações' }); // caso dê algum erro na requisição
  }

};

exports.loadImages = async (req, res) => {
    
    const imagesDirectory = path.resolve(__dirname, '../images', 'home',req.params.imagesDirectory);

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