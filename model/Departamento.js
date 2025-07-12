const Sequelize = require('sequelize');
const sequelize = require('./database');

const Departamento = sequelize.define('departamentos', {
  id_departamentos: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  designacao: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Departamento;
