const fs = require("fs");
const { get } = require("http");
class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
    this.id = 0;
  }
  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8')
      return JSON.parse(objs);
    } catch (error) {
      return []
    }
  }
  async save(Objeto) {
    const objs = await this.getAll()
    let newid;
    if (objs.length === 0) {
      newid = 1
    } else {
      newid = objs[objs.length - 1].id + 1
    }
    const newObj = { ...Objeto, id: newid }
    objs.push(newObj)
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs))
      return newid;
    } catch (err) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async deleteAll() {
    console.log("borrando todo...");
    await fs.unlink(this.ruta, (err => {
      if (err) console.log(err);
      else {
        console.log("\n Deleted file: " + this.ruta);
      }
    }))
  }
  async getById(id) {
    const objs = await this.getAll()
    const buscado = objs.find(o => o.id === id)
    return buscado
  }

  async deleteById(id) {
    console.log("borrando archivo #" + id);
    const objs = await this.getAll()
    const index = objs.findIndex(o => o.id === id)
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }

    objs.splice(index, 1)
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(objs))
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`)
    }
  }
  async mostrarRandom(){
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let numeroRandom = getRandomInt(1,4);

    const contenedor = new Contenedor("./productos.txt");
    return await contenedor.getById(numeroRandom);
  }

}
const p1 = {
  nombre: 'producto1',
  precio: 200,
}
const p2 = {
  nombre: 'producto2',
  precio: 300,
}
const p3 = {
  nombre: 'producto3',
  precio: 340,
}

async function prueba() {
    const contenedor = new Contenedor("./productos.txt")
    let id1 = await contenedor.save(p1)
    let id2 = await contenedor.save(p2)
    let id3 = await contenedor.save(p3)
  
    const mostrarTodo = await contenedor.getAll()
    console.log(mostrarTodo)
  
    const buscado = await contenedor.getById(1)
    //console.log(buscado)
    const buscado2 = await contenedor.getById(2)
    //console.log(buscado2)
    const buscado3 = await contenedor.getById(3)
    //console.log(buscado3)
  
    //metodo para borrar por id
    //contenedor.deleteById(3);
  
    //metodo para borrar todo
    //await contenedor.deleteAll(p1);
  }

module.exports = {
  Contenedor
};