
const jwt = require('jsonwebtoken'); //módulo NPM
const config = require('./config.js'); //ficheiro de configuração


let checkToken = (req, res, next) => {
let token = req.headers['x-access-token'] ||
req.headers['authorization'];

  console.log("Token original recebido:", token); 

if (token && token.startsWith('Bearer ')) {
token = token.slice(7, token.length); //remove a palavra ‘Bearer ’
  console.log("Token limpo:", token); 

}
if (token) {
jwt.verify(token, config.jwtSecret, (err, decoded) => {
if (err) {
return res.status(401).json({
success: false,
message:'O token não é válido.'
});
} else {
req.decoded = decoded;
  console.log("Token válido payload:", token); 

next();
}
});
} else {
return res.json({
success: false,
message: 'Token indisponível.'
});
}
};
module.exports = {
checkToken: checkToken
} 