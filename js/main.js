class Producto{
    constructor(codigoProdu,nombreProdu,precioProdu,stockProdu,categoriaProdu,imgProdu) { 
        this.codigo = codigoProdu;
        this.nombre = nombreProdu;
        this.precio = precioProdu;
        this.stock = stockProdu;
        this.categoria = categoriaProdu;
        this.img = imgProdu;   
        this.cantidad = 0; 
    }
    manejarCantidad(comp){
        this.cantidad=comp;
    }
    manejarStock(cant,vaciar){
        vaciar ? this.stock += parseInt(cant) : this.stock -= parseInt(cant)
    }
}

class Carrito{
    constructor(codigoProdu,nombreProdu,precioProdu,cantidadProdu){
        this.codigo = codigoProdu;
        this.nombre = nombreProdu;
        this.precio = precioProdu;  
        this.cantidad = cantidadProdu;
        this.bor = "bor" + codigoProdu;
    }

}

class Totales{
    constructor(totalArticulo){
        this.precio = totalArticulo;
    }
}

let precioTotal = 0;
let descuento = false;
let precioTotal2 = 0;
let vaciar = false;
let listaProductos = [];
listaCompraDos = [];
produc();
recargar = localStorage.getItem("Recargue")

function produc(){
    fetch('data.json')
    .then((resp) => resp.json())
    .then((data) => (data.forEach((producto) => 
                                            listaProductos.push(new Producto(producto.codigo,producto.nombre,producto.precio,producto.stock,producto.categoria,producto.img,producto.cantidad))),mostrar(listaProductos)))   
}
let listaCompra = [];

let hombre = document.querySelector('.categoria1');
let mujer = document.querySelector('.categoria2');
let vestir = document.querySelector('.vestir');
let carritos = document.querySelector('.carrito');

let formularios = document.getElementsByClassName("formulario");
let formularios2 = document.getElementsByClassName("formulario2");
let inputValue = document.getElementsByClassName("btn1");
let inputValue2 = document.getElementsByClassName("btn2");
//-----------------------------------------------------------------
let formulariosX = document.getElementsByClassName("formularioX");
let borrar = document.getElementsByClassName("btn3");

hombre.addEventListener('click', function(){filtroProductos("hombre")});
mujer.addEventListener('click', function(){filtroProductos("mujer")});


function filtroProductos(categoria){
    let listaSegunCategoria = listaProductos.filter(x => x.categoria == categoria)
    let vestir = document.querySelector('.vestir')

    vestir.innerHTML = ' '
    mostrar(listaSegunCategoria)
    for (const formulario of formularios2) {
        formulario.addEventListener("submit",(e)=>e.preventDefault())    
    }
    for (const boton of inputValue2) {
        boton.addEventListener("click", validarProducto);        
    }
}


function mostrar(listaProducto){
    if(recargar){
        listaCompraDos = JSON.parse(localStorage.getItem("Carrito"))
    }
        for (const producto of listaProducto) {
            
            let contenedor = document.createElement("div");
            contenedor.innerHTML = `
                                    <img src=${producto.img} width="200px" alt="Conjunto_Deportivo" class="imagen"/>
                                    <h3>${producto.nombre}</h3>
                                    <h3>$ ${producto.precio}</h3>
                                    <form class ="formulario">
                                        <input type="number"name="cantidad" style="width: 4em" min=1 max=${producto.stock} value=0 class ="cantidad1"></input>
                                        <input type="submit" value="Agregar a carrito" class ="btn1" id=${producto.codigo}></input>
                                    </form>
                                    `
            vestir.appendChild(contenedor);
            if(listaCompraDos != null){
                for (const producto2 of listaCompraDos){
                    if(producto2.codigo == producto.codigo){
                        producto.manejarStock(producto2.cantidad);
                    }
                }
            }
    }
    for (const formulario of formularios) {
        formulario.addEventListener("submit",(e)=>e.preventDefault())    
    }
    
    for (const boton of inputValue) {
        boton.addEventListener("click", validarProducto);        
    }
}


function validarProducto (e){    
    let id = e.target.id;
    let cod = listaProductos.find(producto=>producto.codigo == id)
    let cantidadPro = e.target.previousSibling.previousSibling.value;
    if(cantidadPro >0){
        cod.manejarCantidad(cantidadPro)
        if(cod.cantidad>cod.stock){
            Swal.fire({
                title: 'Error!',
                text: 'Cantidad pedida es mayor al stock existente',
                icon: 'info',
                confirmButtonText: 'Cool'
              })
            cod.cantidad = cod.stock;
            cod.manejarStock(cod.stock);    
        }
        else{
            cod.manejarStock(cod.cantidad);
        }
        let auxiliar = new Carrito(cod.codigo,cod.nombre,(cod.precio*cod.cantidad),cod.cantidad);
        listaCompra.push(auxiliar);
        
        carritos.innerHTML = ' '
        precioTotal += auxiliar.precio;
        carritoCompra();
        localStorage.setItem("Carrito",JSON.stringify(listaCompra));
        localStorage.setItem("Total",precioTotal);
        localStorage.setItem("Recargue",true);
    }
    
}

function total(){
    if (precioTotal>=100000){
        precioTotal2 = precioTotal * 0.85;
        descuento = true
    }
}

function carritoCompra(){
    carritos.innerHTML = ' '
    descuento = false;    
    precioTotal2 = precioTotal;
    total();
    let contenedorcarrito1 = document.createElement("div");
    let contenedorcarrito3 = document.createElement("div");
    let contenedorcarrito4 = document.createElement("div");
    contenedorcarrito1.innerHTML =`<h3>--------Carrito--------</h3>`
    carritos.appendChild(contenedorcarrito1);    
    for (const producto of listaCompra) {    
        let contenedorcarrito2 = document.createElement("div");
        contenedorcarrito2.innerHTML = `
                                <p>${producto.nombre}   ${producto.cantidad}     $${producto.precio} <form class ="formularioX"> <input type="submit" value="X" class ="btn3 btn" id=${producto.bor}></input></form> </p>
                                `                        
        carritos.appendChild(contenedorcarrito2);   
    }
    if(descuento){
        contenedorcarrito3.innerHTML = `<p>------------------------------------------</p>
                                        <p> Su compra supera los $100000 tiene un descuento del 15%</p>
                                        <p>Total = ${precioTotal2}</p>`    
    }
    else{
        contenedorcarrito3.innerHTML = `<p>------------------------------------------</p>
                                        <p>Total = ${precioTotal2}</p>`
    }  
    carritos.appendChild(contenedorcarrito3);
    
    contenedorcarrito4.innerHTML = `
                                    <input type="submit" value="Finalizar compra" id='fin'></input>
                                    <input type="submit" value="Vaciar carrito" id='borra'></input>
                                    `
    carritos.appendChild(contenedorcarrito4);

    for (const formularioXX of formulariosX) {
        formularioXX.addEventListener("submit",(e)=>e.preventDefault())    
    }
    
    for (const botonborrar of borrar) {
        botonborrar.addEventListener("click", borrarItem);           
    }
    let finalizar = document.getElementById("fin");
    finalizar.addEventListener("click",confirmarCompra);
    let vaciarCarito = document.getElementById("borra");
    vaciarCarito.addEventListener('click', function(){vaciarCarrito()});
}

function confirmarCompra(){
    localStorage.setItem("TotalDesc",precioTotal2); 
    window.location.href ="./contacto.html"  
    
}

function borrarItem(e){
    localStorage.removeItem("Carrito",JSON.stringify(listaCompra));
    let id = e.target.id;
    let cod = listaCompra.find(producto=>producto.bor == id)
    for (const produ of listaProductos) {
        if(produ.codigo === cod.codigo){ 
            produ.manejarStock((-cod.cantidad)); 
        }   
    }
    listaCompra = listaCompra.filter((carritoId) => {
        return carritoId !==cod;
    })
    precioTotal -= cod.precio
    localStorage.setItem("Carrito",JSON.stringify(listaCompra));
    localStorage.setItem("Total",precioTotal);
    
    carritoCompra();
}

function vaciarCarrito(){

    Swal.fire({
        title: 'Vaciar carrito?',
        text: "Esta por borrar todos sus articulos del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            carritos.innerHTML = ' '
            listaCompra = [];
            listaProducto = [];
            produc();
            precioTotal = 0;
            carritoCompra();
            localStorage.clear();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su carrito fue vaciado',
                width: '200px',
                showConfirmButton: false,
                timer: 1500
              })
        }
      })
}

function loadCarrito(){
    if(localStorage.getItem("Carrito") != null){
        listaCompra = JSON.parse(localStorage.getItem("Carrito"))
        precioTotal = parseInt(localStorage.getItem("Total"))
    }
    carritoCompra()
}

loadCarrito();