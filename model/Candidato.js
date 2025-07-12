const Sequelize = require("sequelize");
const sequelize = require("./database");

const Candidato = sequelize.define(
  "candidatos",
  {
    id_candidatos: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    diplomado: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Candidato;
