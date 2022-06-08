
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 07/Junio/2022
* @description Script para cargar archivos Excel.
*/

var f = require('../../funciones');
require('datejs')

var mongoose = require('mongoose');
var url = 'mongodb+srv://guilleaua:FjLFulM5SfPZQVSE@cluster0.62tyk.mongodb.net/?retryWrites=true&w=majority';

var schemas = new mongoose.Schema({
    archivo: {
        id: { type: Number },
        fechaCreacion: { type: String },
        archivo: { type: Array }
    }
})

const modelo = {
    examen: mongoose.model('schemas', schemas ,'documentos')
}

module.exports = {
    recuperaArchivos: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivos recuperados",
            data: []
        }
        if(!f.definido(archivo)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            mongoose.connect(url, function(err, db) {
                if(err) {
                    response.replyCode = 500;
                    response.replyText = 'Error en la conexión a mongo';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    let documentos = db.collection('documentos').find({});
                    response.replyCode = 200;
                    response.replyText = 'Documento cargado con exito';
                    response.data = [documentos];
                    res.status(200).send(response);
                }
            })

        }  
    },

    recuperaArchivoDetalle: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivo recuperado",
            data: []
        }

        let id = parseInt(req.body.id)

        if(!f.definido(id)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            mongoose.connect(url, function(err, db) {
                if(err) {
                    response.replyCode = 500;
                    response.replyText = 'Error en la conexión a mongo';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    db.collection('documentos').deleteOne({'body.id': id});
                }
            })

            response.replyCode = 200;
            response.replyText = 'Documento borrado con exito';
            response.data = [];
            res.status(200).send(response);
        }
    }
} 