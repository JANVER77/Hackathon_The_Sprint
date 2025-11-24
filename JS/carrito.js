function incrementarProducto(element) {
  if(+element.previousElementSibling.textContent < 20){
    element.previousElementSibling.textContent = +element.previousElementSibling.textContent + 1
  }
}

function desincrementarProducto(element) {
  if(element.nextElementSibling.textContent != 1) {
    element.nextElementSibling.textContent = +element.nextElementSibling.textContent - 1
  }
}

function anadirCarrito(element) {
  alert("Se añadió al carrito")
  // Redireccionar la página al carrito
  // window.location.href = "http://127.0.0.1:5500/carrito.html";
  
  // Obtenemos el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const nombre = element.previousElementSibling.previousElementSibling.textContent
  const precio = element.previousElementSibling.textContent
  
  // http://127.0.0.1:5500/Assets/Img/jersey1_U.png
  let url = new URL(element.parentNode.previousElementSibling.firstElementChild.src);
  let path = url.pathname; // "/Assets/Img/jersey1_U.png"

  let nuevoProducto = {
    nombre : nombre,
    imagen: "." + path,
    precioFalso : parseInt(precio.split("$")[1].replace(",", "")) * 1.28,
    precio : parseInt(precio.split("$")[1].replace(",", "")), 
    cantidad: 1
  }

  // Push pero añade las cosas al principio
  carrito.unshift(nuevoProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarVista() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const divCarrito = document.getElementById("carritoCompras")

  carrito.forEach(producto => {
    const cardProducto = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${producto.imagen}" class="img-fluid rounded-start" alt="Producto">
          </div>

          <div class="col-md-8 p-3">

            <h5 class="fw-bold mb-2">${producto.nombre}</h5>

            <span class="price-original">$${producto.precioFalso}</span>
            <span class="price">$${producto.precio}</span>

            <span class="envio-tag">Envío gratis</span>

            <div>
              <div class="d-flex align-items-center gap-3">
                <button type="button" class="btn btn-counter" onclick="desincrementarProducto(this)">-</button>
                <span class="fw-semibold">1</span>
                <button type="button" class="btn btn-counter" onclick="incrementarProducto(this)">+</button>
              </div>
              <span class="d-block mt-2 text-muted small">Máx 20 unidades</span>
            </div>
          </div>
        </div>

        <hr>
    `

    divCarrito.innerHTML += cardProducto
  });

  actualizarResumen()
}

function actualizarResumen() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.info(carrito)

  const cantidadProductos = carrito.length;
  let subTotal = 0

  carrito.forEach(producto => {
    subTotal += producto.precio * producto.cantidad
  });

  document.getElementById("cantidadProductos").textContent = `Productos (${cantidadProductos})`
  document.getElementById("subTotal").textContent = `$${subTotal}`
  document.getElementById("descuento").textContent = `-$${subTotal*0.1}`
  document.getElementById("total").textContent = `$${subTotal*0.9}`
  document.getElementById("tituloCarrito").textContent = `(${cantidadProductos} Productos)`
}

actualizarVista()