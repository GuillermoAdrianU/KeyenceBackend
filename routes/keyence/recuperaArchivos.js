
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 07/Junio/2022
* @description Script para cargar archivos Excel.
*/

var f = require('../../funciones');
require('datejs')

var mongoose = require('mongoose');
var url = 'mongodb+srv://guilleaua:FjLFulM5SfPZQVSE@cluster0.62tyk.mongodb.net/?retryWrites=true&w=majority';
var archivoModel = require('../../schemas/schemas')

module.exports = {
    recuperaArchivos: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivos recuperados",
            data: []
        }

        mongoose.connect(url, async function(err, db) {
            if(err) {
                response.replyCode = 500;
                response.replyText = 'Error en la conexión a mongo';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                let documentos = await archivoModel.modelo.archivoModelo.find({},{"_id": 0, "body.archivo": 0});
                response.replyCode = 200;
                response.replyText = 'Documentos recuperados con exito';
                response.data = [documentos];
                res.status(200).send(response);
            }
        })
    },

    recuperaArchivoDetalle: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivos recuperados",
            data: []
        }

        let id = parseInt(req.params.id);

        if(!f.definido(id)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            mongoose.connect(url, async function(err, db) {
                if(err) {
                    response.replyCode = 500;
                    response.replyText = 'Error en la conexión a mongo';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    let documentos = await archivoModel.modelo.archivoModelo.find({"body.id": id});
                    response.replyCode = 200;
                    response.replyText = 'Documentos recuperados con exito';
                    response.data = [documentos];
                    res.status(200).send(response);
                }
            })
        }
    }
} 