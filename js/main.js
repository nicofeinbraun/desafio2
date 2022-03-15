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
    manejarcantidad(comp){
        this.cantidad=comp;
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


let producto1 = new Producto(1,"conjunto deportivo",7199,30,"hombre","./fotos/conjuntodeportivo.jpg");
let producto2 = new Producto(2,"saco",6000,10,"hombre","./fotos/Saco.jpg");
let producto3 = new Producto(3,"remera hombre",800,100,"hombre","./fotos/Remera.jpg");
let producto4 = new Producto(4,"jean",2000,26,"hombre","./fotos/jean-hombre.jpg");
let producto5 = new Producto(5,"remera deportiva mujer",1050,45,"mujer","./fotos/remeradeportiva.jpg");
let producto6 = new Producto(6,"remera deportiva",1300,45,"hombre","./fotos/remeradeporte.jpg");
let producto7 = new Producto(7,"jean mujer",1800,20,"mujer","./fotos/jean.jpg");

let listaProductos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7];
let listaCompra = [];

let hombre = document.querySelector('.categoria1');
let mujer = document.querySelector('.categoria2');
let vaciarCarro = document.querySelector('.vaciar');
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
vaciarCarro.addEventListener('click', function(){vaciarCarrito()});

mostrar(listaProductos);

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
        cod.manejarcantidad(cantidadPro)
        if(cod.cantidad>cod.stock){
            cod.cantidad= cod.stock;
        }
        let auxiliar = new Carrito(cod.codigo,cod.nombre,(cod.precio*cod.cantidad),cod.cantidad);
        listaCompra.push(auxiliar);
        
        carritos.innerHTML = ' '
        precioTotal += auxiliar.precio;
        carritoCompra();
        localStorage.setItem("Carrito",JSON.stringify(listaCompra));
        localStorage.setItem("Total",precioTotal);
    }
    
}

function total(){
    if (precioTotal>=100000){
        precioTotal2 = precioTotal * 0.85;
        descuento = true
        return precioTotal2
    }
}

function carritoCompra(){
    carritos.innerHTML = ' '
    descuento = false;    
    precioTotal2 = precioTotal;
    validar = total();
    let contenedorcarrito1 = document.createElement("div");
    let contenedorcarrito2 = document.createElement("div");
    contenedorcarrito1.innerHTML =`<h3>--------Carrito--------</h3>`
    carritos.appendChild(contenedorcarrito1);    
    for (const producto of listaCompra) {    
        let contenedorcarrito3 = document.createElement("div");
        contenedorcarrito3.innerHTML = `
                                <p>${producto.nombre}                  ${producto.cantidad}     $${producto.precio} <form class ="formularioX"> <input type="submit" value="X" class ="btn3 btn" id=${producto.bor}></input></form> </p>
                                `                        
        carritos.appendChild(contenedorcarrito3);   
    }
    if(descuento){
        contenedorcarrito2.innerHTML = `<p>------------------------------------------</p>
                                        <p> Su compra supera los $100000 tiene un descuento del 15%</p>
                                        <p>Total = ${precioTotal2}</p>`    
    }
    else{
        contenedorcarrito2.innerHTML = `<p>------------------------------------------</p>
                                        <p>Total = ${precioTotal2}</p>`
    }  
    carritos.appendChild(contenedorcarrito2);
    for (const formularioXX of formulariosX) {
        formularioXX.addEventListener("submit",(e)=>e.preventDefault())    
    }
    
    for (const botonborrar of borrar) {
        botonborrar.addEventListener("click", borrarItem);           
    }
}

function borrarItem(e){
    localStorage.removeItem("Carrito",JSON.stringify(listaCompra));
    let id = e.target.id;
    let cod = listaCompra.find(producto=>producto.bor == id)
    listaCompra = listaCompra.filter((carritoId) => {
        return carritoId !==cod;
    })
    precioTotal -= cod.precio
    localStorage.setItem("Carrito",JSON.stringify(listaCompra));
    localStorage.setItem("Total",precioTotal);
    carritoCompra();
}

function vaciarCarrito(){
    carritos.innerHTML = ' '
    listaCompra = [];
    precioTotal = 0;
    carritoCompra();
    localStorage.clear();
}

function loadCarrito(){
    if(localStorage.getItem("Carrito") != null){
        listaCompra = JSON.parse(localStorage.getItem("Carrito"))
        precioTotal = parseInt(localStorage.getItem("Total"))
    }
    carritoCompra()
}

loadCarrito();