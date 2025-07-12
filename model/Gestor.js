const Sequelize = require("sequelize");
const sequelize = require("./database");

const Gestor = sequelize.define(
  "gestores",
  {
    id_gestores: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    id_departamentos: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "departamentos",
        key: "id_departamentos",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Gestor;
