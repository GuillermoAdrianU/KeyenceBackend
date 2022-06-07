
/**
* @author Guillermo Adrian Urbina Aguiñiga
* @date 06/Junio/2022
* @description Script para cargar archivos Excel.
*/

module.exports = {
    prueba: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "App corriendo",
            data: []
        }

        response.replyCode = 200;
        response.replyText = 'Aplicación corriendo';
        response.data = [];
        res.status(200).send(response);
    }  
}