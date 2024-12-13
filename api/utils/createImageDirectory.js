const fs = require('fs').promises;
const path = require('path');

const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

// Função para criar o diretório e salvar as imagens
const createImageDirectory = async (imagem1, imagem2) => {
    const dirName = getFormattedDate() + '_' + process.env.IMG_SECRET;
    const dirPath = path.join(__dirname, '../images', dirName);

    // Criar o diretório
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (err) {
        console.error('Erro ao criar diretório:', err);
        return;
    }

    // Salvar a primeira imagem
    try {
        const filePath1 = path.join(dirPath, 'imagem1.png');
        await fs.writeFile(filePath1, imagem1[0].name);
    } catch (err) {
        console.error('Erro ao escrever imagem 1:', err);
    }

    // Se imagem2 for fornecida, salvar a segunda imagem
    if (imagem2) {
        try {
            const filePath2 = path.join(dirPath, 'imagem2.png');
            await fs.writeFile(filePath2, imagem2[0].name);
        } catch (err) {
            console.error('Erro ao escrever imagem 2:', err);
        }
    }

    return dirName;
};

module.exports = createImageDirectory