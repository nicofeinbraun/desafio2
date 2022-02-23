function Producto (codigoProdu,nombreProdu,precioProdu,stockProdu){ 
    this.codigo = codigoProdu; //Este lo voy a utilizar mas adelante pero ya quiero dejarlo armado
    this.nombre = nombreProdu;
    this.precio = precioProdu;
    this.stock = stockProdu;    
}

let nombre;
let comprado;
let precioTotal = 0;
let confirma;

const producto1 = new Producto(1,"conjunto deportivo",7199,30);
const producto2 = new Producto(2,"saco",6000,10);
const producto3 = new Producto(3,"remera hombre",800,100);
const producto4 = new Producto(4,"jean",2000,26);
const producto5 = new Producto(5,"remera deportiva mujer",1050,45);

function productos(){  
    alert("Los productos en stock son: \n"+producto1.codigo+" - "+producto1.nombre +" $"+producto1.precio+"\n"+producto2.codigo+" - "+producto2.nombre+" $"+producto2.precio+"\n"+producto3.codigo+" - "+producto3.nombre+" $"+producto3.precio+"\n"+producto4.codigo+" - "+producto4.nombre+" $"+producto4.precio+"\n"+producto5.codigo+" - "+producto5.nombre+" $"+producto5.precio);
}



function calcularPrecio(precio,comprado){
    precioTotal += comprado * precio;    
}

function ajusteStock(stock,comprado){
    stock -= comprado;
    return stock;
}

function compra(precio,nombre,stock){
    comprado = parseInt(prompt("Cuantos desea comprar:"));
    if (comprado <= stock){
        calcularPrecio (precio,comprado);
        console.log(nombre+" cantidad "+ comprado + " = $"+(precio*comprado));
        stock = ajusteStock(stock,comprado);
    }
    else{
        alert("No tenemos stock suficiente de ese producto, puede comprar hasta " + stock + " unidades");
        confirma = prompt("Desea comprar el restante de articulos?");
        if (confirma == "si"){
            calcularPrecio(precio,stock,stock);
            console.log(nombre+" cantidad "+ stock + " = $"+(precio*stock));
            stock = ajusteStock(stock,stock);
        }
    }
    return stock           
}
function comprarProductos(){
    do {
        nombre = prompt("Ingrese nombre del producto:").toLowerCase();
            switch(nombre){
                case producto1.nombre:
                    producto1.stock = compra (producto1.precio,nombre,producto1.stock);
                    break;
                case producto2.nombre:
                    producto2.stock = compra (producto2.precio,nombre,producto2.stock);
                    break;
                case producto3.nombre:
                    producto3.stock = compra (producto3.precio,nombre,producto3.stock);
                    break;
                case producto4.nombre:
                    producto4.stock = compra (producto4.precio,nombre,producto4.stock);
                    break;
                case producto5.nombre:
                    producto5.stock = compra (producto5.precio,nombre,producto5.stock);
                    break;
                case "":
                    break;
                default:
                    alert("Articulo inexistente por favor elija otro producto ");
                    break;
            } 
    } while (nombre != "");
    menu()    
}

function stockProductos(){
    alert("Stock actualizado de los productos: \n"+producto1.nombre + " -> "+producto1.stock+"\n"+producto2.nombre + " -> "+producto2.stock+"\n"+producto3.nombre + " -> "+producto3.stock+"\n"+producto4.nombre + " -> "+producto4.stock+"\n"+producto5.nombre + " -> "+producto5.stock);
    menu();
}

function total(){
    if (precioTotal>=100000){
        alert("Su compra supera los $100000 tiene un descuento del 15%");
        precioTotal = precioTotal * 0.85;
    }
    alert("El total de su compra es de $"+precioTotal);
}
function menu(){
    let opcion = prompt("Menu: \n1 - Articulos\n2 - Stock productos \n3 - Completar compra");

    switch(opcion){
        case "1":
            productos();
            comprarProductos();
            break;
        case "2":
            stockProductos();
            break;
        case "3":
            total();
            break;
        default:
            alert("Seleccione una opcion valida");
            menu()
            break;

    }
}
menu()