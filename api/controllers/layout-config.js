const LayoutConfig = require('../models/LayoutConfig');

exports.layoutUpdate = async (req, res) => {
    
  
    try {
  
        const updated = await LayoutConfig.update(
          { imagens: newImages }, // campos recebem valores atualizados
          { where: { id: 1 } }  // condição para encontrar o usuário
        );
  
        if (!updated) {
          return res.status(404).json({ message: 'Usuário não encontrado.' }); // caso usuário não seja encontrado
        }
  
        return res.status(200).json({ message: 'Configurações atualizadas com sucesso.' }); // caso seja atualizado com sucesso
  
  
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar configurações' }); // caso dê algum erro na requisição
    }
  
  }
  