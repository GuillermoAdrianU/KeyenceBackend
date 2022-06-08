
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

    eliminaUsuarios: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivos recuperados",
            data: []
        }

        let id = req.body.id.toString()

        if(!f.definido(id)) {
            mongoose.connect(url, async function(err, db) {
                if(err) {
                    response.replyCode = 500;
                    response.replyText = 'Error en la conexión a mongo';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    let usuarios = await usuarioModel.modelo.usuarioModelo.remove({"_id": id});
                    response.replyCode = 200;
                    response.replyText = 'Usuarios eliminados';
                    response.data = [usuarios];
                    res.status(200).send(response);
                }
            })
        } else {
            response.replyCode = 500;
            response.replyText = 'Error en la conexión a mongo';
            response.data = undefined;
            res.status(500).send(response);
        }
    },

    actualizaUsuarios: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Archivos recuperados",
            data: []
        }

        let id = req.body.id;
        let rubro = req.body.rubro;
        let valor = req.body.valor;

        if(rubro === 0 || rubro === 1) {
            valor = valor.toString()
        } else {
            valor = parseInt(valor)
        }

        if(!f.definido(id) || !f.definido(rubro)) {
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
                    if(rubro === 0) {
                        let usuarios = await usuarioModel.modelo.usuarioModelo.updateOne({"_id": id}, {$set: {"user.User ID": valor}});
                        response.replyCode = 200;
                        response.replyText = 'Campo actualizado';
                        response.data = [usuarios];
                        res.status(200).send(response);
                    } else if (rubro === 1) {
                        let usuarios = await usuarioModel.modelo.usuarioModelo.updateOne({"_id": id}, {$set: {"user.User Name": valor}});
                        response.replyCode = 200;
                        response.replyText = 'Campo actualizado';
                        response.data = [usuarios];
                        res.status(200).send(response);
                    } else if (rubro === 2) {
                        let usuarios = await usuarioModel.modelo.usuarioModelo.updateOne({"_id": id}, {$set: {"user.Date": valor}});
                        response.replyCode = 200;
                        response.replyText = 'Campo actualizado';
                        response.data = [usuarios];
                        res.status(200).send(response);
                    } else if (rubro === 3) {
                        let usuarios = await usuarioModel.modelo.usuarioModelo.updateOne({"_id": id}, {$set: {"user.Punch In": valor}});
                        response.replyCode = 200;
                        response.replyText = 'Campo actualizado';
                        response.data = [usuarios];
                        res.status(200).send(response);
                    } else {
                        let usuarios = await usuarioModel.modelo.usuarioModelo.updateOne({"_id": id}, {$set: {"user.Punch Out": valor}});
                        response.replyCode = 200;
                        response.replyText = 'Campo actualizado';
                        response.data = [usuarios];
                        res.status(200).send(response);
                    }
                }
            })
        }
    }
} 