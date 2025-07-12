const Proposta = require('../model/Proposta');
const sequelize = require('../model/database');
const TipoDeProposta = require('../model/TipoDeProposta');
const RegimeDeProposta = require('../model/RegimeDeProposta');
const ModalidadeDeProposta = require('../model/ModalidadeDeProposta');

const controllers = {};

sequelize.sync();

/* LISTAR PROPOSTAS ---------------------- */
controllers.list = async (req, res) => {
  try {
    const data = await Proposta.findAll({
      include: [
        { model: TipoDeProposta, as: 'tipo' },
        { model: RegimeDeProposta, as: 'regime' },
        { model: ModalidadeDeProposta, as: 'modalidade' }
      ]
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao listar propostas.', error: err });
  }
};


/* REGISTAR PROPOSTA ---------------------- */
controllers.create = async (req, res) => {
  const {
    id_empresas,
    id_regimes_de_propostas,
    id_tipo_de_propostas,
    id_modalidades_de_propostas,
    titulo,
    descricao,
    localizacao,
    data_de_publicacao,
    prazo_de_candidaturas,
    estado
  } = req.body;

  try {
    const data = await Proposta.create({
      id_empresas,
      id_regimes_de_propostas,
      id_tipo_de_propostas,
      id_modalidades_de_propostas,
      titulo,
      descricao,
      localizacao,
      data_de_publicacao,
      prazo_de_candidaturas,
      estado
    });

    res.status(200).json({
      success: true,
      message: "Proposta registada com sucesso.",
      data: data
    });
  } catch (error) {
    console.log("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao registar proposta.",
      error: error.message
    });
  }
};

/* PROPOSTA ---------------------- */
controllers.get = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Proposta.findOne({
      where: { id_propostas: id },
      include: [
        { model: TipoDeProposta, as: 'tipo' },
        { model: RegimeDeProposta, as: 'regime' },
        { model: ModalidadeDeProposta, as: 'modalidade' }
      ]
    });

    if (!data) {
      return res.status(404).json({ success: false, message: 'Proposta não encontrada.' });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter dados da proposta.',
      error: error.message
    });
  }
};


/* EDITAR PROPOSTA ---------------------- */
controllers.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const result = await Proposta.update(updatedData, {
      where: { id_propostas: id }
    });

    if (result[0] === 1) {
      res.status(200).json({ success: true, message: "Proposta atualizada com sucesso." });
    } else {
      res.status(404).json({ success: false, message: "Proposta não encontrada ou dados iguais." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao atualizar proposta.", error: error.message });
  }
};

/* ELIMINAR PROPOSTA ---------------------- */
controllers.delete = async (req, res) => {
// parâmetros por post
const { id } = req.body;
// delete por sequelize
const del = await Proposta.destroy({
where: { id_propostas: id}
})
res.json({success:true,deleted:del,message:"Deleted successful"});
}

module.exports = controllers;
