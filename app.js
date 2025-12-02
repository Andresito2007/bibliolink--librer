
const express= require('express');
//IMPORTAMOS EXPRESS
const userRoutes = require('../routes/user.routes');
const librosRoutes=require('../routes/user.routes2')
const reservasRoutes=require('../routes/user.routes3')
const app=express(); //CON ESTO YA TENEMOS CREADO NUESTRO SERVIDOR
const cors= require('cors')
//el cors para que los usuarios puedan acceder al servidor

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


// endpoints , son url especifica que nuestro houst hace para darnos acceso a cierta informacion 
//cuando usamos un endpoint le mandamos una solicitud a nuestro servidor
// debemos ponerla en el postman antes de /crud por id
app.use('/user', userRoutes);
app.use('/libros', librosRoutes);
app.use('/reservas', reservasRoutes);


module.exports = app;
///exportamos el modulo
