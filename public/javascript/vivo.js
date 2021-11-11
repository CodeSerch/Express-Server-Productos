var socket = io();

var btn = document.getElementById('btn');
var input2 = document.getElementById('input2');
var lista = document.getElementById('lista');


btn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("se clickeo ");
  const producto1 = "dentro de vivo.js"
  socket.emit('send product', producto1);
});

socket.on('send product', function (product) {
  console.log("desde vivo.js:" + JSON.stringify(product));
  lista.textContent = product;
});


