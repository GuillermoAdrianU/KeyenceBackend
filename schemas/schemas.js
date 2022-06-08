var mongoose = require('mongoose');

var schemas = new mongoose.Schema({
    body: { type: Object }
})

const modelo = {
    archivoModelo: mongoose.model('schemas', schemas ,'documentos')
}

module.exports = {modelo}