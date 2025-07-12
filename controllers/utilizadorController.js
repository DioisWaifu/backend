const {
  Utilizador,
  TipoDeUtilizador,
  Gestor,
  Departamento,
  Empresa,
  Candidato,
  sequelize,
} = require("../model/ligacoes");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const controllers = {};

sequelize.sync();

/* LISTAR UTILIZADORES ---------------------- */
controllers.list = async (req, res) => {
  try {
    const data = await Utilizador.findAll({
      include: [
        { model: TipoDeUtilizador, as: "tipo" },
        {
          model: Gestor,
          as: "gestores",
          include: [{ model: Departamento, as: "departamento" }],
        },
        { model: Empresa, as: "empresas" },
        { model: Candidato, as: "candidatos" },
      ],
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao listar utilizador.",
      error: err.message || err,
    });
  }
};

/* OBTER UTILIZADOR ---------------------- */
controllers.get = async (req, res) => {
  const { id } = req.params;
  try {
    const utilizador = await Utilizador.findOne({
      where: { id_utilizadores: id },
      include: [
        { model: TipoDeUtilizador, as: "tipo" },
        {
          model: Gestor,
          as: "gestores",
          include: [{ model: Departamento, as: "departamento" }],
        },
        { model: Empresa, as: "empresas" },
        { model: Candidato, as: "candidatos" },
      ],
    });
    if (!utilizador) {
      return res
        .status(404)
        .json({ success: false, message: "Utilizador não encontrado." });
    }
    res.json({ success: true, data: utilizador });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao obter utilizador.",
      error: err.message || err,
    });
  }
};

/* CRIAR UTILIZADOR ---------------------- */
controllers.create = async (req, res) => {
  let {
    id_tipo_de_utilizadores,
    id_gestores,
    id_empresas,
    id_candidatos,
    nome,
    email,
    senha,
    remover_conta,
    contacto,
    localizacao,
    descricao,
    website,
    diplomado,
  } = req.body;

  try {
    // Se for empresa e não tiver empresa selecionada, cria nova empresa
    if (
      id_tipo_de_utilizadores === "2" &&
      (!id_empresas || id_empresas === "")
    ) {
      if (!contacto || !localizacao || !descricao || !website) {
        return res.status(400).json({
          success: false,
          message:
            "Dados completos da empresa são obrigatórios para criar uma nova empresa.",
        });
      }

      const novaEmpresa = await Empresa.create({
        contacto,
        localizacao,
        descricao,
        website,
      });
      id_empresas = novaEmpresa.id_empresas;
    }

    const novoCandidato = await Candidato.create({
      diplomado,
    });
    id_candidatos = novoCandidato.id_candidatos;

    // Converter strings vazias para null
    id_gestores = id_gestores === "" ? null : id_gestores;
    id_empresas = id_empresas === "" ? null : id_empresas;
    id_candidatos = id_candidatos === "" ? null : id_candidatos;

    // Encriptar a senha
    //senha = bcrypt.hashSync(senha, 10);

    // Criar o utilizador
    const utilizador = await Utilizador.create({
      id_tipo_de_utilizadores,
      id_gestores,
      id_empresas,
      id_candidatos,
      nome,
      email,
      senha,
      remover_conta,
    });

    // Associações
    if (id_tipo_de_utilizadores === "3" && id_gestores) {
      await utilizador.setGestores(id_gestores);
    } else if (id_tipo_de_utilizadores === "2" && id_empresas) {
      await utilizador.setEmpresas(id_empresas);
    } else if (id_tipo_de_utilizadores === "1" && id_candidatos) {
      await utilizador.setCandidatos(id_candidatos);
    }

    res.status(201).json({
      success: true,
      message: "Utilizador registado com sucesso.",
      data: utilizador,
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao registar utilizador.",
      error: error.message,
    });
  }
};


/* EDITAR UTILIZADOR ---------------------- */
controllers.update = async (req, res) => {
  const { id } = req.params;
  let {
    id_tipo_de_utilizadores,
    id_gestores,
    id_departamento,
    id_empresas,
    id_candidatos,
    nome,
    email,
    senha,
    remover_conta,
    contacto,
    localizacao,
    descricao,
    website,
    diplomado,
  } = req.body;

  // Converter strings vazias para null
  id_gestores = id_gestores === "" ? null : id_gestores;
  id_departamento = id_departamento === "" ? null : id_departamento;
  id_empresas = id_empresas === "" ? null : id_empresas;
  id_candidatos = id_candidatos === "" ? null : id_candidatos;

  try {
    // Atualizar dados básicos do utilizador
    const result = await Utilizador.update(
      {
        id_tipo_de_utilizadores,
        nome,
        email,
        senha,
        remover_conta,
      },
      { where: { id_utilizadores: id } }
    );

    if (result[0] !== 1) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado ou dados iguais.",
      });
    }

    // Atualizar relação N:N gestor-utilizador
    if (id_tipo_de_utilizadores === 3) {
      const utilizador = await Utilizador.findByPk(id);
      if (!utilizador) {
        return res
          .status(404)
          .json({ success: false, message: "Utilizador não encontrado." });
      }

      if (id_gestores) {
        await utilizador.setGestores([id_gestores]);

        await Gestor.update(
          { id_departamento: id_departamento },
          { where: { id_gestores } }
        );
      } else {
        await utilizador.setGestores([]);
      }
    }

    // Atualizar empresa se for tipo 2
    if (id_tipo_de_utilizadores === 2 && id_empresas) {
      await Empresa.update(
        { contacto, localizacao, descricao, website },
        { where: { id_empresas } }
      );
    }

    // Atualizar candidato se for tipo 1
    if (id_tipo_de_utilizadores === 1 && id_candidatos) {
      await Candidato.update(
        { diplomado: diplomado },
        { where: { id_candidatos: id_candidatos } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Utilizador e respetiva entidade atualizados com sucesso.",
    });
  } catch (error) {
    console.error("Erro no update utilizador:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar utilizador.",
      error: error.message,
    });
  }
};

/* ELIMINAR UTILIZADOR ---------------------- */
controllers.delete = async (req, res) => {
  const { id } = req.body;

  try {
    const utilizador = await Utilizador.findByPk(id);
    if (!utilizador) {
      return res
        .status(404)
        .json({ success: false, message: "Utilizador não encontrado" });
    }

    // Remove relações para permitir eliminar utilizador
    await utilizador.setGestores([]);
    await utilizador.setEmpresas([]);
    await utilizador.setCandidatos([]);

    // Elimina o utilizador
    await utilizador.destroy();

    res.json({ success: true, message: "Utilizador eliminado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao eliminar utilizador",
      error: error.message,
    });
  }
};

/* login UTILIZADOR ---------------------- */

controllers.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hashedSenha = bcrypt.hashSync(senha, 10); // ← Encriptação correta

    const data = await Utilizador.create({
      nome,
      email,
      senha: hashedSenha,
    });

    res.status(200).json({
      success: true,
      message: "Registado",
      data: data,
    });
  } catch (error) {
    console.error("Erro no registo:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao registar utilizador.",
      error: error.message,
    });
  }
};


controllers.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ success: false, message: "Campos em branco." });
    }

    const utilizador = await Utilizador.findOne({ where: { email } });

    if (!utilizador) {
      return res.status(404).json({ success: false, message: "Utilizador não encontrado." });
    }

    const isMatch = bcrypt.compareSync(senha, utilizador.senha);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Senha inválida." });
    }

const token = jwt.sign(
  {
    id_utilizadores: utilizador.id_utilizadores,
    email: utilizador.email,
    role: utilizador.id_tipo_de_utilizadores
  },
  config.jwtSecret,
  { expiresIn: "1h" }
);

    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token: token,
      role: utilizador.id_tipo_de_utilizadores,
      id_utilizadores: utilizador.id_utilizadores 
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
};



module.exports = controllers;
