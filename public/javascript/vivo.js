var socket = io();

var btn = document.getElementById('btn');
var input2 = document.getElementById('input2');
var lista = document.getElementById('lista');

btn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("se clickeo ");
  const producto1 = "refresh desde vivo.js"
  socket.emit('send product', producto1);
});

socket.on('refresh product', function (product) {
  const producto1 = "refresh desde vivo.js"
  socket.emit('send product', producto1);
  console.log("refresh productos " + product)
});

socket.on('send product', function (product) {
  lista.textContent = JSON.stringify(product);
});


