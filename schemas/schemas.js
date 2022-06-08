var mongoose = require('mongoose');

var schemas = new mongoose.Schema({
    body: { type: Object }
})

var usuarios = new mongoose.Schema({
    "user": {
        "User ID": { type: String },
        "User Name": { type: String },
        "Date": { type: Number },
        "Punch In": { type: Number },
        "Punch Out": { type: Number }
    }
})

const modelo = {
    archivoModelo: mongoose.model('schemas', schemas, 'documentos'),
    usuarioModelo: mongoose.model('usuarios', usuarios, 'usuarios')
}

module.exports = {modelo}