const express = require('express')
const cors = require('cors')
const app = express();
//eliminar los CORS
app.use(cors())
//usar las variables de entorno
require('dotenv').config();

const path = require('path');

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

const PORT = process.env.PORT || 9000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/documentation', (req,res)=>{
    res.redirect('https://sky-session-d09.notion.site/Bantexico-Project-68933055a7b3436dbb41502ce1b4f210')
})

//usar las rutas
require('./routes/2-indexRoutes')(app)

app.listen(PORT, ()=>{
    console.log(`El servidor esta activo en el puerto:${PORT}`);
})