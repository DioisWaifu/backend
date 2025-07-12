const Sequelize = require("sequelize");
const sequelize = require("./database");

const Proposta = require("./Proposta");
const TipoDeProposta = require("./TipoDeProposta");
const RegimeDeProposta = require("./RegimeDeProposta");
const ModalidadeDeProposta = require("./ModalidadeDeProposta");

const TipoDeUtilizador = require("./TipoDeUtilizador");
const Utilizador = require("./Utilizador");
const Gestor = require("./Gestor");
const Empresa = require("./Empresa");
const Candidato = require("./Candidato");
const Departamento = require("./Departamento");



//-------------------------------------------------------------- PROPOSTAS --------------------------------------------------------------//
// PROPOSTAS E TIPO -------------------------------------------------
Proposta.belongsTo(TipoDeProposta, {
  foreignKey: "id_tipo_de_propostas",
  as: "tipo",
});

// PROPOSTAS E REGIMES ----------------------------------------------
Proposta.belongsTo(RegimeDeProposta, {
  foreignKey: "id_regimes_de_propostas",
  as: "regime",
});

// PROPOSTAS E MODALIDADES ------------------------------------------
Proposta.belongsTo(ModalidadeDeProposta, {
  foreignKey: "id_modalidades_de_propostas",
  as: "modalidade",
});

//------------------------------------------------------------- UTILIZADORES ------------------------------------------------------------//

// Utilizador tem um TipoDeUtilizador
Utilizador.belongsTo(TipoDeUtilizador, {
  foreignKey: "id_tipo_de_utilizadores",
  as: "tipo",
  timestamps: false,
});

// EMPRESA E UTILIZADORES -------------------------------------------
// Relação N:N Utilizador <-> Empresa
Utilizador.belongsToMany(Empresa, {
  through: "relationship_utilizadores_empresas",
  foreignKey: "id_utilizadores",
  otherKey: "id_empresas",
  as: "empresas",
  timestamps: false,
});
Empresa.belongsToMany(Utilizador, {
  through: "relationship_utilizadores_empresas",
  foreignKey: "id_empresas",
  otherKey: "id_utilizadores",
  as: "utilizadores",
  timestamps: false,
});

// CANDIDATOS E UTILIZADORES -------------------------------------------
// Relação N:N Utilizador <-> Candidato
Utilizador.belongsToMany(Candidato, {
  through: "relationship_utilizadores_candidatos",
  foreignKey: "id_utilizadores",
  otherKey: "id_candidatos",
  as: "candidatos",
  timestamps: false,
});
Candidato.belongsToMany(Utilizador, {
  through: "relationship_utilizadores_candidatos",
  foreignKey: "id_candidatos",
  otherKey: "id_utilizadores",
  as: "utilizadores",
  timestamps: false,
});

// GESTOR E UTILIZADORES -------------------------------------------
// Relação N:N Utilizador <-> Gestor
Utilizador.belongsToMany(Gestor, {
  through: "relationship_utilizadores_gestores",
  foreignKey: "id_utilizadores",
  otherKey: "id_gestores",
  as: "gestores",
  timestamps: false,
});
Gestor.belongsToMany(Utilizador, {
  through: "relationship_utilizadores_gestores",
  foreignKey: "id_gestores",
  otherKey: "id_utilizadores",
  as: "utilizadores",
  timestamps: false,
});

// GESTOR E DEPARTAMENTOS -------------------------------------------
// um gestor só pertence a um departamento
Gestor.belongsTo(Departamento, {
  foreignKey: "id_departamentos",
  as: "departamento",
  timestamps: false,
});

// um departamento tem muitos gestores
Departamento.hasMany(Gestor, {
  foreignKey: "id_departamentos",
  as: "gestores",
  timestamps: false,
});

module.exports = {
  sequelize,
  TipoDeUtilizador,
  Utilizador,
  Gestor,
  Departamento,
  Empresa,
  Candidato,
};
