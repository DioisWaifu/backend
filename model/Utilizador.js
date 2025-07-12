const Sequelize = require("sequelize");
const sequelize = require("./database");
const bcrypt = require("bcrypt"); //encripta a pass a guardar na BD

const Utilizador = sequelize.define(
  "utilizadores",
  {
    id_utilizadores: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipo_de_utilizadores: {
      type: Sequelize.INTEGER,
    },
    id_empresas: {
      type: Sequelize.INTEGER,
    },
    id_gestores: {
      type: Sequelize.INTEGER,
    },
    id_candidatos: {
      type: Sequelize.INTEGER,
    },
    nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    remover_conta: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

Utilizador.beforeCreate((utilizadores, options) => {
  return bcrypt
    .hash(utilizadores.senha, 10)
    .then((hash) => {
      utilizadores.senha = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

module.exports = Utilizador;
