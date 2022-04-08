const express = require('express')
const cors = require('cors')
const app = express();
//eliminar los CORS
app.use(cors())
//usar las variables de entorno
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

//usar las rutas
require('./routes/2-indexRoutes')(app)

app.listen(9000, ()=>{
    console.log('El servidor esta activo en el puerto:9000');
})