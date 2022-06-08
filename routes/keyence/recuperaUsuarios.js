
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 07/Junio/2022
* @description Script para cargar archivos Excel.
*/

var f = require('../../funciones');
require('datejs')

var mongoose = require('mongoose');
var url = 'mongodb+srv://guilleaua:FjLFulM5SfPZQVSE@cluster0.62tyk.mongodb.net/?retryWrites=true&w=majority';
var usuarioModel = require('../../schemas/schemas')

module.exports = {
    recuperaUsuarios: async (req, res) => {
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
                let usuarios = await usuarioModel.modelo.usuarioModelo.find({});
                response.replyCode = 200;
                response.replyText = 'Documentos recuperados con exito';
                response.data = [usuarios];
                res.status(200).send(response);
            }
        })
    },

    recuperaUsuarioDetalle: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Usuarios recuperados",
            data: []
        }

        let id = req.params.id.toString();

        mongoose.connect(url, async function(err, db) {
            if(err) {
                response.replyCode = 500;
                response.replyText = 'Error en la conexión a mongo';
                response.data = undefined;
                res.status(500).send(response);
            } else {
                let usuarios = await usuarioModel.modelo.usuarioModelo.find({"_id": id});
                response.replyCode = 200;
                response.replyText = 'Usuarios recuperados con exito';
                response.data = [usuarios];
                res.status(200).send(response);
            }
        })
    }
} 