
//Evento submit
let formulario = document.getElementById("form")
console.log(formulario)

formulario.addEventListener('submit', datosForm)

function datosForm(e){

    //cancelamos por las dudas 
    //e.preventDefault();
    //capturar los datos de los input

    //let datos = e.target
    //obtenemos los datos ingresados e enviados en el evento
    //console.log(datos.children[0].value)
    //console.log(datos.children[1].value)
    //let user = datos.children[0].value;
    //let password = datos.children[1].value;
    //check if user name and pasword correct

    //if(user=="Admin"&& password=="Admin123"){
    //alert("iniciar sesión con éxito")

    //}
    //else{
    alert("Gracias por su Compra, A su Correo llegara un Correo. Orden de Compra 125487")
    //}

}





//Crear contenedorProductos
const contenedorProductos = document.getElementById('contenedor-productos')

//Crear contenedorCarrito
const contenedorCarrito = document.getElementById('carrito-contenedor')

// Creacion de botones
const botonVaciar = document.getElementById('vaciar-carrito')
const botonProcesar = document.getElementById('procesar-carrito')

//Modificamos el contador del carrito
const contadorCarrito = document.getElementById('contadorCarrito')

// Calculos Matematicos 
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const precioTotalIva = document.getElementById('precioTotalIva')
const cantidadTotal = document.getElementById('cantidadTotal')
const precioTransporte = document.getElementById('preciotransporte')
const preciofinal = document.getElementById('preciofinal')

let carrito = []
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Accion Vaciar Carrito
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//Inyectamos el HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Posicion: ${producto.PosicionC}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `

    // Agregamos el boton de Agregar
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`)
   

    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        agregarAlCarrito(producto.id)
        //
    })
})


//Agaregar al carrito
const agregarAlCarrito = (prodId) => {
    //proceso para aumentar cantidad y que no se repita
    //comprobar si el elemento ya existe en el carro
    const existe = carrito.some (prod => prod.id === prodId) 
    if (existe){ 
        // Si el ID ya existe , actulizamos la cantidad
        const prod = carrito.map (prod => { 
            //creamos un nuevo arreglo e repetimos sobre cada ID y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        // si NO Existe , agregamos el ID al Carrito
        const item = stockProductos.find((prod) => prod.id === prodId)
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
    actualizarCarrito() 
}


// eliminar Item del Carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    //Busca el elemento y devuelve su indice.
    const indice = carrito.indexOf(item) 
    //Le pasamos el indice y borramos 
    carrito.splice(indice, 1) 
    // un elemento 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    //Vamos Agregando los productos al carrito
    contenedorCarrito.innerHTML = "" 
    //actualizarCarrito
    //borrar el nodo. 
    //recorro el array lo actualizo de nuevo 
    //y lo rellena con la info
    //actualizado
    //Agrgar al modal
    //Recorremos sobre el array de carrito.
    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `<p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    // actualizamos el Tamaño del carrito.
    contadorCarrito.innerText = carrito.length 

    //console.log(carrito)
    precioTotal.innerText = carrito.reduce((accumulador, prod) => accumulador + prod.cantidad * prod.precio, 0)
    precioTotalIva.innerText = carrito.reduce((accumulador, prod) =>    accumulador + (prod.cantidad * prod.precio ) *0.13   , 0)
    
    // Transporte es costo Fijo 2000
    precioTransporte.innerText = 2000
    preciofinal.innerText = 2000 + carrito.reduce((accumulador, prod) => accumulador + prod.cantidad * prod.precio, 0) + carrito.reduce((acc, prod) =>    acc + (prod.cantidad * prod.precio ) *0.13   , 0)
    //Por cada producto en el carrito el acumulador le suma precio, Iva, Precio Final + Transporte, en base al acumulador
    
}
