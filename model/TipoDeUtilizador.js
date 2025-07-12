const Sequelize = require("sequelize");
const sequelize = require("./database");

const TipoDeUtilizador = sequelize.define(
  "tipo_de_utilizadores",
  {
    id_tipo_de_utilizadores: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    designacao: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TipoDeUtilizador;
