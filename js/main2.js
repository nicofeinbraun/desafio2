let precioTotal2 = 0;
let listaCompra = [];

let carritos = document.querySelector('.carrito');
let formularios = document.querySelector('.formulario');

function carritoFin(){
    carritos.innerHTML = ' '
    let contenedorcarrito1 = document.createElement("div");
    let contenedorcarrito3 = document.createElement("div");
    contenedorcarrito1.innerHTML =`<h3>Finalizar Compra</h3>`
    carritos.appendChild(contenedorcarrito1);    
    for (const producto of listaCompra) {    
        let contenedorcarrito2 = document.createElement("div");
        contenedorcarrito2.innerHTML = `
                                <p>${producto.nombre}   ${producto.cantidad}     $${producto.precio}</p>
                                `                        
        carritos.appendChild(contenedorcarrito2);   
    }
    if(precioTotal2 >= 100000){
        contenedorcarrito3.innerHTML = `<p>------------------------------------------</p>
                                        <p> Su compra supera los $100000 tiene un descuento del 15%</p>
                                        <p>Total = ${precioTotal2}</p>`    
    }
    else{
        contenedorcarrito3.innerHTML = `<p>------------------------------------------</p>
                                        <p>Total = ${precioTotal2}</p>`
    }  
    carritos.appendChild(contenedorcarrito3);
}

function formularioCompra(){
    formularios.innerHTML = ''
    let contenedorform = document.createElement("div");
    contenedorform.innerHTML =`
                                <form action="#" class = "formu">
                                <fieldset>
                                    <legend>Formulario de contacto</legend>
                                    <div>
                                        <label for="nombre">* Nombre</label>
                                        <input type="text"name="name"placeholder="escribe tu nombre" required id="nom">
                                    </div>
                                    <div>
                                        <label for="apellido">* Apellido</label>
                                        <input type="text"name="apellido"placeholder="escribe tu apellido" required id="ape">
                                    </div>
                                    <br>
                                    <div>
                                        <label for="email">* Escribe tu mail</label>
                                        <input type="email" name="email" required id="mail">
                                    </div>
                                    <br>
                                    <div>
                                        <label for="direccion">* Lugar de entrega</label>
                                        <input type="text" name="direccion" required id="dir">
                                    </div>
                                    <br>
                                    <div>
                                        <label for="Comentario">Deja tu consulta</label>
                                        <br>
                                        <textarea name="comentario" id="comenta" cols="20" rows="10"></textarea>
                                    </div>
                                    <div>
                                        <input type="submit" value="Enviar" id="confirmar">
                                    </div>
                                </fieldset>
                            </form> 
                            `
    formularios.appendChild(contenedorform);
    
    //let formula = document.getElementById("formu");
    //formula.addEventListener("submit",(e)=>e.preventDefault());
    let confirma = document.getElementById("confirmar");
    confirma.addEventListener("click",(e)=>e.preventDefault(finalizarCompra));

}

function finalizarCompra(){
    console.log("Finalizo")
}

function loadCarrito(){
    if(localStorage.getItem("Carrito") != null){
        listaCompra = JSON.parse(localStorage.getItem("Carrito"));
        precioTotal2 = parseInt(localStorage.getItem("TotalDesc"));
    }
    carritoFin();
    console.log(listaCompra);
}

loadCarrito();
formularioCompra();