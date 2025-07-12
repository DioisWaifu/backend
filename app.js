const express = require('express');
const app = express();
var cors = require('cors');
const middleware = require('./middleware');


app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());


// Importar rotas

//Propostas
const propostaRoutes = require('./routes/propostaRoute');
app.use('/propostas', propostaRoutes);

const regimeDePropostaRoutes = require('./routes/regimeDePropostaRoute');
app.use('/regimes', regimeDePropostaRoutes);

const modalidadeDePropostaRoutes = require('./routes/modalidadeDePropostaRoute');
app.use('/modalidades', modalidadeDePropostaRoutes);

const tipoDePropostaRoutes = require('./routes/tipoDePropostaRoute');
app.use('/tiposproposta', tipoDePropostaRoutes);



//Utilizadores
const utilizadorRoutes = require("./routes/utilizadorRoute");
app.use("/utilizadores", utilizadorRoutes);

const tipoDeUtilizadorRoutes = require('./routes/tipoDeUtilizadorRoute');
app.use('/tiposdeutilizador', tipoDeUtilizadorRoutes);

//Empresa
const empresaRoutes = require('./routes/empresaRoute');
app.use('/empresas', empresaRoutes);

//Candidato
const candidatoRoutes = require('./routes/candidatoRoute');
app.use('/candidatos', candidatoRoutes);

//Gestpr
const gestorRoutes = require('./routes/gestorRoute');
app.use('/gestores', gestorRoutes);

const departamentoRoute = require('./routes/departamentoRoute');
app.use('/departamentos', departamentoRoute);



//Competências
const competenciaRoutes = require('./routes/competenciaRoute');
app.use('/competencias', competenciaRoutes);




app.listen(app.get('port'), () => {
  console.log('Servidor a correr na porta ' + app.get('port'));
});
