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
const { createArchivo, deleteArchivo, updateArchivo, readArchivo } = require('./cargaExcel')

//Metodos
router.post('/createArchivo', createArchivo)
router.post('/deleteArchivo', deleteArchivo)
router.post('/updateArchivo', updateArchivo)
router.post('/readArchivo', readArchivo)

module.exports = router;