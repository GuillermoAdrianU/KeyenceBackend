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
const { createArchivo, deleteArchivo, updateArchivo, readArchivo } = require('./cargaExcel')
const { recuperaArchivos, recuperaArchivoDetalle } = require('./recuperaArchivos')

//Metodos
router.get('/', prueba)
router.get('/recuperaArchivos', recuperaArchivos)
router.get('/recuperaArchivoDetalle/:id', recuperaArchivoDetalle)
router.post('/createArchivo', createArchivo)
router.post('/deleteArchivo', deleteArchivo)
router.post('/updateArchivo', updateArchivo)
router.post('/readArchivo', readArchivo)


module.exports = router;