var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload')
router.use(fileUpload({
    limits: {
      fileSize: 1024*1024*50
    },
    abortOnLimit: true
}));

//Constantes de metodos
const { prueba } = require('./prueba')
const { createArchivo, deleteArchivo } = require('./cargaExcel')
const { recuperaArchivos, recuperaArchivoDetalle } = require('./recuperaArchivos')
const { recuperaUsuarios, actualizaUsuarios, eliminaUsuarios } = require('./recuperaUsuarios')

//Metodos
router.get('/', prueba)
router.get('/recuperaArchivos', recuperaArchivos)
router.get('/recuperaArchivoDetalle/:id', recuperaArchivoDetalle)
router.get('/recuperaUsuarios', recuperaUsuarios)
router.post('/actualizaUsuarios', actualizaUsuarios)
router.post('/createArchivo', createArchivo)
router.post('/deleteArchivo', deleteArchivo)
router.post('/eliminaUsuario', eliminaUsuarios)

module.exports = router;