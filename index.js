//Initializations
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const prueba1 = require('./programa');
const path = require('path');
const productos = new prueba1.Contenedor('./productos.txt')
const app = express();

//MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'root',
  database:'node20_mysql'
})

// Check connect
connection.connect(error => {
  if(error) throw error;
  console.log('Database server running');
})
//definiendo objeto
const objeto1 = {title:"producto1" ,price:2, url:"ejemplo.png"};
const update1 = {title:"producto2" ,price:350, url:"ejemplo2.png"};

//app.listen(PORT, ()=> (console.log(`Server  running on port ${PORT}`)))

//APIs
const url="https://api.publicapis.org/entries";

//Settings
const PORT = 8080;

//Middlewares

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

//Routes
/*app.get('/', function(req, res) {
  res.send('Welcome to my api');
});*/

app.get("/productos", async (req, res) => {
  const prods = await productos.getAll();
  console.log(prods);
  res.send(prods)
})

app.get("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("tu id es : " + id);
  const prods = await productos.getById(id);
  console.log(prods);
  res.send(prods)
})

app.get("/productoRandom", async (req, res) => {
  const prods = await productos.mostrarRandom();
  console.log(prods);
  res.send(prods)
})


app.post('/add', async function (req, res) {
  const prods = await productos.save(objeto1);
  console.log(prods);
  res.send("se añadio un objeto con id " + prods)
});

app.put('/update/:id', async (req, res) =>{
  const id = parseInt(req.params.id);
  //const {title, price, url} = req.body; objetoUpdate1
  const prods = await productos.update(update1.title,update1.price,update1.url,id);
  console.log(prods);
  res.send("se actualizo el objeto con id " + prods)
})

app.delete('/delete/:id', async (req, res) =>{
  const id = parseInt(req.params.id);
  console.log("objeto a eliminar, id: " + id);
  await productos.deleteById(id);
  res.send("objeto con id: " + id + " eliminado");
})

app.delete('/deleteAll', async (req, res) =>{
  const respuesta = await productos.deleteAll();
  res.send(respuesta);
})
  
//Start the server
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log('Server started at http://localhost:' + PORT);
});
