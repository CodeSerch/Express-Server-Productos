//Initializations
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const prueba1 = require('./programa');
const path = require('path');
const productos = new prueba1.Contenedor('./productos.txt')
const app = express();
const cors = require('cors');


const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];


//socket io 
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('new connection1', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  })


  socket.on('send product', async (product) => {
    console.log("producto recibido: " + product)
    const prods = await productos.getAll();
    io.sockets.emit('send product', prods);
  })
});

/*socket.on("lista", function async () {
  const prods = productos.getAll();
  render(prods);
});*/



/*io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
  });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});*/

//MySQL
/*const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'root',
  database:'node20_mysql'
})*/

// Check connect
/*connection.connect(error => {
  if(error) throw error;
  console.log('Database server running');
})
*/

//definiendo objeto
const objeto1 = { title: "producto1", price: 2, url: "ejemplo.png" };
const update1 = { title: "producto2", price: 350, url: "ejemplo2.png" };

//app.listen(PORT, ()=> (console.log(`Server  running on port ${PORT}`)))

//APIs
const url = "https://api.publicapis.org/entries";

//Settings
const PORT = 8080;

//Middlewares
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes

/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});*/

app.get('/', function (req, res) {
  res.render('home', { navbar: 'navbar' });
});

app.get('/productosD', function (req, res) {
  res.render('enVivo');
});

app.get("/productos", async (req, res) => {
  const prods = await productos.getAll();
  console.log(prods);
  res.render('view', { layout: 'main', title: JSON.stringify(prods) });
})

app.get("/chat", (req, res) => {
  res.render('chat', { layout: 'main', title: "chat" });
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

app.post('/addForm', async function (req, res) {
  console.log(req.body.title)
  try {
    const objetoGuardar = { title: req.body.title, price: req.body.price, url: req.body.imgUrl };
    const prods = await productos.save(objetoGuardar);
    console.log(prods);
    const producto1 = "refresh desde index.js"
    io.emit('refresh product', prods);
    res.redirect('/')
  //res.redirect('/productos')
  }
  catch (error) {
    console.log("error, no se pudo guardar, " + error)
  res.redirect('/')
  }
});

app.put('/update/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  //const {title, price, url} = req.body; objetoUpdate1
  const prods = await productos.update(update1.title, update1.price, update1.url, id);
  console.log(prods);
  res.send("se actualizo el objeto con id " + prods)
})

app.delete('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("objeto a eliminar, id: " + id);
  await productos.deleteById(id);
  res.send("objeto con id: " + id + " eliminado");
})

app.delete('/deleteAll', async (req, res) => {
  const respuesta = await productos.deleteAll();
  res.send(respuesta);
})

//Start the server
server.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log('Server started at http://localhost:' + PORT);
});
