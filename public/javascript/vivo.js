var socket = io();

var btn = document.getElementById('btn');
var input2 = document.getElementById('input2');
var lista = document.getElementById('lista');

btn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("se clickeo ");
  const producto1 = "hola2"
  socket.emit('send product', producto1);
});

socket.on('send product', function (product) {
  lista.textContent = product;
  console.log("ahora si")
});


