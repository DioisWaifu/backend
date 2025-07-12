const Sequelize = require("sequelize");
const sequelize = require("./database");


const Proposta = sequelize.define(
  "propostas",
  {
    id_propostas: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    
    id_empresas: Sequelize.INTEGER,

    id_regimes_de_propostas: Sequelize.INTEGER,

    id_tipo_de_propostas: Sequelize.INTEGER,

    id_modalidades_de_propostas: Sequelize.INTEGER,

    titulo: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    descricao: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    localizacao: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    data_de_publicacao: Sequelize.STRING(15),
    prazo_de_candidaturas: Sequelize.STRING(15),
    estado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);



module.exports = Proposta;
