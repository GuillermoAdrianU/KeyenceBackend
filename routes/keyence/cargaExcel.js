
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 06/Junio/2022
* @description Script para cargar archivos Excel.
*/

var xlsx = require("xlsx");
var fs = require('fs')
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

function ExcelAJSON(archivo) {
    let fecha = Date.now();
    fs.writeFileSync(`./files/archivo${fecha}.xlsx`, archivo.data)
    return new Promise((resolve) => {
        const excel = xlsx.readFile(`./files/archivo${fecha}.xlsx`);
        fs.unlinkSync(`./files/archivo${fecha}.xlsx`)
        var nombreHoja = excel.SheetNames;
        let datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
        const jDatos = [];
        for (let i = 0; i < datos.length; i++) {
          const dato = datos[i];
          jDatos.push({
            ...dato,
          });
        }
        resolve(jDatos)
    })
}

module.exports = {
    createArchivo: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Documento cargado",
            data: []
        }

        let archivo = req.files.archivo

        if(!f.definido(archivo)) {
            response.replyCode = 500;
            response.replyText = 'Error en la solicitud de datos';
            response.data = undefined;
            res.status(500).send(response);
        } else {
            let archivoFinal = await ExcelAJSON(archivo);

            let body = {
                id: parseInt(Date.now()),
                fechaCreacion: Date.today().toString('yyyy-MM-dd'),
                archivo: archivoFinal
            }

            mongoose.connect(url, function(err, db) {
                if(err) {
                    response.replyCode = 500;
                    response.replyText = 'Error en la conexión a mongo';
                    response.data = undefined;
                    res.status(500).send(response);
                } else {
                    db.collection('documentos').insertOne({body});
                }
            })

            response.replyCode = 200;
            response.replyText = 'Documento cargado con exito';
            response.data = [];
            res.status(200).send(response);
        }  
    },

    deleteArchivo: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Documento cargado",
            data: []
        }

        let id = req.body.id

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
    },

    updateArchivo: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Documento cargado",
            data: []
        }
    },

    readArchivo: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Documento cargado",
            data: []
        }
    },
} 