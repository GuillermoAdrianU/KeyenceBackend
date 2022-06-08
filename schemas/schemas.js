var mongoose = require('mongoose');

var schemas = new mongoose.Schema({
    body: { type: Object }
})

var usuarios = new mongoose.Schema({
    "User ID": { type: String },
    "User Name": { type: String },
    "Date": { type: String },
    "Punch In": { type: String },
    "Punch Out": { type: String }
})

const modelo = {
    archivoModelo: mongoose.model('schemas', schemas, 'documentos'),
    usuarioModelo: mongoose.model('usuarios', usuarios, 'usuarios')
}

module.exports = {modelo}