// Este es el script para crear las tarjetas

// Primero seleccionamos la section donde pondremos todas las tarjetas
const contenedorTarjetas = document.getElementById("productos-container");

/* A continuación creamos las tarjetas de productos teniendo en cuenta el array de objetos
en instrumentos.js (que simula la base de datos). Ciclamos por el array y creamos un elemento,
que será cada uno una tarjeta de producto */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoInstrumento = document.createElement("div"); // Para crear el div de la tarjeta
    nuevoInstrumento.classList = `tarjeta-producto` // Su clase será "tarjeta-producto"
    // Agregamos todas las etiquetas html y los atributos que tendrá cada tarjeta
    // Extramos las propiedades de cada objeto para utilizar sus valores
    nuevoInstrumento.innerHTML = ` 
    <img src="./img/productos/${producto.id}.jpg" alt="Instrumento 1">
    <h3>${producto.nombre}</h3>
    <p class="tipo">${producto.tipo}</p>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>` 
    contenedorTarjetas.appendChild(nuevoInstrumento);
    /* Agregamos un EventListener para agregar el producto al local storage cuando
    el usuario presione el botón de la tarjeta */
    nuevoInstrumento.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(instrumentos);
