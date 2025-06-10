const Section = require('../models/Section');

exports.addSection = async (req, res) => {
    
    try{
        const { sectionName, sectionOrder } = req.body;
        console.log(req.body)

        await Section.create({
            nome: sectionName,
            ordem: sectionOrder
        })
    
        return res.status(200).json({ message: 'Seção adicionada com sucesso!'});
    }catch(e){
        console.error(e);
        return res.status(500).json({ message: 'Erro no servidor ao adicionar seção'});
    }
};


exports.loadSections = async (req, res) => {
    const sections = await Section.findAll();

    return res.status(200).json({sections});
};
