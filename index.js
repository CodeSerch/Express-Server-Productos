//Initializations
const express = require('express');
const app = express();
const morgan = require('morgan');
const prueba1 = require('./programa');
const path = require('path');
const productos = new prueba1.Contenedor('./productos.txt')

//Settings
const PORT = 8080;

//Middlewares

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/productos", async (req, res) => {
  const prods = await productos.getAll();
  console.log(prods);
  res.send(prods)
})

app.get("/productoRandom", async (req, res) => {
  const prods = await productos.mostrarRandom();
  console.log(prods);
  res.send(prods)
})
  
//Start the server
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log('Server started at http://localhost:' + PORT);
});
