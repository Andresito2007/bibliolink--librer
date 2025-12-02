const mysql2= require('mysql2'); //hacemos la conexion de nuestro mysql con el node
//Traemos la libreria con require

//Creamos la conexion con nuestra base de datos con el metodo create.conecction
const database= mysql2.createConnection({
    host: "localhost",
    port:3306,
    user:'root',
    password:'123456',
    database:'BIBLIOLINK',
});
//BIBLIOLINK
module.exports = database;
//lo exportamos