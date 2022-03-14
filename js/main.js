class Producto{
    constructor(codigoProdu,nombreProdu,precioProdu,stockProdu,categoriaProdu,imgProdu) { 
        this.codigo = codigoProdu; //Este lo voy a utilizar mas adelante pero ya quiero dejarlo armado
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


hombre.addEventListener('click', function(){filtroProductos("hombre")});
mujer.addEventListener('click', function(){filtroProductos("mujer")});
vaciarCarro.addEventListener('click', function(){vaciarCarrito()});

function filtroProductos(categoria){
    let listaSegunCategoria = listaProductos.filter(x => x.categoria == categoria)
    let vestir = document.querySelector('.vestir')

    vestir.innerHTML = ' '

    for (const producto of listaSegunCategoria) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
                            <img src=${producto.img} width="200px" alt="Conjunto_Deportivo" class="imagen"/>
                            <h3>${producto.nombre}</h3>
                            <h3>$ ${producto.precio}</h3>
                            <form class ="formulario2">
                                <input type="number"name="cantidad" style="width: 4em" min=1 max=${producto.stock} value=0 class ="cantidad1"></input>
                                <input type="submit" value="Agregar a carrito" class ="btn2"></input>
                            </form>
                            `
    vestir.appendChild(contenedor);
    }
    for (const formulario of formularios2) {
        formulario.addEventListener("submit",(e)=>e.preventDefault())    
    }
    for (const boton of inputValue2) {
        boton.addEventListener("click", validarProducto);        
    }
}



for (const producto of listaProductos) {
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



let formularios = document.getElementsByClassName("formulario");
let formularios2 = document.getElementsByClassName("formulario2");
let inputValue = document.getElementsByClassName("btn1");
let inputValue2 = document.getElementsByClassName("btn2");

for (const formulario of formularios) {
    formulario.addEventListener("submit",(e)=>e.preventDefault())    
}

for (const boton of inputValue) {
    boton.addEventListener("click", validarProducto);        
}
/*for (const formulario of formularios2) {
    //console.log("entro")
    formulario.addEventListener("submit",(e)=>e.preventDefault())    
}
for (const boton of inputValue2) {
    boton.addEventListener("click", validarProducto);        
}*/


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
        
        /*for (const producto of listaCompra) {
            if(producto.codigo == auxiliar.codigo){
                producto.cantidad = parseInt(auxiliar.cantidad) + parseInt(producto.cantidad);
                //listaCompra.pop();
            }
        }*/
        
        carritos.innerHTML = ' '
        
        calcularTotal(cod.precio,cod.cantidad);
        carritoCompra(listaCompra);
        localStorage.setItem("Carrito",JSON.stringify(listaCompra))
    }
    
}


function calcularTotal(precio,cantidad){
    precio = precio*cantidad;
    precioTotal += precio;       
}

function total(){
    if (precioTotal>=100000){
        precioTotal2 = precioTotal * 0.85;
        descuento = true
        return precioTotal2
    }
}

function carritoCompra(listaCompras){
    precioTotal2 = precioTotal;
    validar = total();
    let contenedorcarrito1 = document.createElement("div");
    let contenedorcarrito2 = document.createElement("div");
    contenedorcarrito1.innerHTML =`<h3>--------Carrito--------</h3>`
    carritos.appendChild(contenedorcarrito1);
    for (const producto of listaCompras) {    
        let contenedorcarrito3 = document.createElement("div");
        contenedorcarrito3.innerHTML = `
                                <p>${producto.nombre}                  ${producto.cantidad}     $${producto.precio}</p>
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
}

function vaciarCarrito(){
    carritos.innerHTML = ' '
    listaCompra = [];
    precioTotal = 0;
    carritoCompra(listaCompra);
    localStorage.clear();
}

function loadCarrito(){
    if(localStorage.getItem("Carrito") != null){
        var carro = JSON.parse(localStorage.getItem("Carrito"))
    }
    carritoCompra(carro)
}

loadCarrito();


/*function restaPrecio(indice){
    listaTotal.splice(indice,1);
    console.log(listaTotal);
}

function restaPrecio(precio){
    precioTotal -= precio;
}

function ajusteStock(stock,comprado){
    stock -= comprado;
    return stock;
}
function sumaStock(stock,comprado){
    stock += comprado;
    return stock;
}*/