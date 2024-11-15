// Script para las funcionalidades del carrito: agregar o quitar productos, reiniciar carrito...

// Seleccionamos el contador del carrito para luego hacerlo dinámico y actualizar la cantidad
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  /* Como en el local storage almacenamos sólo strings, lo convertimos en un objeto y lo
  almacenamos en una variable. Si no encuentra un item con la clave "instrumentos"
  memoria será igual a null */
  let memoria = JSON.parse(localStorage.getItem("instrumentos"));
  let cantidadProductoFinal;
  //Si no hay localstorage porque memoria == null, lo creamos
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = agregarPropCantidad(producto)
    // Antes de agregar el producto al localstorage, lo debemos convertir en string
    localStorage.setItem("instrumentos",JSON.stringify([nuevoProducto]));
    // Como agregamos un producto al carrito, debemos actualizar el contador
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    // Si hay localstorage, me fijo si el artículo ya está ahí
    /* Vemos si en la memoria, algun elemento tiene su propiedad id igual a la del
    producto cuyo botón se accionó */
    const indiceProducto = memoria.findIndex(instrumento => instrumento.id === producto.id)
    // const nuevaMemoria = memoria; testing
    // Si el producto no está en el carrito (findIndex devuelve -1), lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = agregarPropCantidad(producto);
      // nuevaMemoria.push(nuevoProducto); testing
      memoria.push(nuevoProducto); // testing
      cantidadProductoFinal = 1;
    } else {
      // Si el producto está en el carrito, le agrego 1 a la cantidad
      // nuevaMemoria[indiceProducto].cantidad ++; testing
      memoria[indiceProducto].cantidad ++; // testing
      // cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad; testing
      cantidadProductoFinal = memoria[indiceProducto].cantidad; // testing
    }
    // localStorage.setItem("instrumentos",JSON.stringify(nuevaMemoria)); testing
    localStorage.setItem("instrumentos",JSON.stringify(memoria)); // testing
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("instrumentos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(instrumento => instrumento.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("instrumentos",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega la propiedad "cantidad" a un objeto producto, con el valor de 1 */
function agregarPropCantidad(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito que encuentra en el header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("instrumentos"));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0) // Con reduce, recorremos el array y sumamos los valores de la propiedad cantidad de cada objeto del array de instrumentos
    return cuentaCarritoElement.innerText = cuenta;
  }
  // Si no hay elementos en la memoria, la cuenta es igual a 0
  cuentaCarritoElement.innerText = 0;
}

/** Funcion para reiniciar el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("instrumentos");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();