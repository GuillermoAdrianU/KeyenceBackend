
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 06/Junio/2022
* @description Script de prueba.
*/



module.exports = {
    prueba: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Documento cargado",
            data: []
        }

        response.replyCode = 200;
        response.replyText = 'Documento cargado con exito';
        response.data = [];
        res.status(200).send(response);
    }
} 