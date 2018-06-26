const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const request = require("request");

var respuesta = {
    "fulfillmentText": "texto"
};

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));


server.use(bodyParser.json());

server.post('/', function (req, res, next) {
    let url = "http://192.168.0.191:8090/Dev_status.cgi?&Port=1";

    const body = req.body;
    res.set('Content-Type', 'text/plain'); 
    
    request.get(url, (error, response, body) => {
        datos = JSON.parse(body);
        let volts = datos.devstatus.Sys_Batt_V;
        let watts = datos.devstatus.ports[0].VAC_out * datos.devstatus.ports[0].Inv_I;
        let formulario = ["las baterias tienen una carga de ", volts, " volts, y estamos consumiendo ", watts, " watts"] .join("");
        respuesta.fulfillmentText = formulario;
        res.send(respuesta);
    });
})

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});

