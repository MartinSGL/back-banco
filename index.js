const express = require('express')
const cors = require('cors')
const app = express();
//eliminar los CORS
app.use(cors())
//usar las variables de entorno
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

const PORT = process.env.PORT || 9000;

app.get('/', (req,res)=>{
    res.send('bienvenido a la api')
})

app.use(favicon(__dirname + 'favicon.ico'));

//usar las rutas
require('./routes/2-indexRoutes')(app)

app.listen(PORT, ()=>{
    console.log(`El servidor esta activo en el puerto:${PORT}`);
})