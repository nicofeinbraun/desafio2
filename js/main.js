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

const listaProductos = [producto1,producto2,producto3,producto4,producto5];
const listaCompra = [];

function productos(){  
    alert("Los productos en stock son: \n"+listaProductos[0].codigo+" - "+listaProductos[0].nombre +" $"+listaProductos[0].precio+"\n"+listaProductos[1].codigo+" - "+listaProductos[1].nombre+" $"+listaProductos[1].precio+"\n"+listaProductos[2].codigo+" - "+listaProductos[2].nombre+" $"+listaProductos[2].precio+"\n"+listaProductos[3].codigo+" - "+listaProductos[3].nombre+" $"+listaProductos[3].precio+"\n"+listaProductos[4].codigo+" - "+listaProductos[4].nombre+" $"+listaProductos[4].precio);
}

function calcularPrecio(precio,comprado){
    precioTotal += comprado * precio;    
}

function ajusteStock(stock,comprado){
    stock -= comprado;
    return stock;
}

function compra(id,precio,nombre,stock){
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
    const agregado = new Producto(id,nombre,(precio*comprado),comprado);
    listaCompra.push(agregado);
    return stock           
}

function comprarProductos(){
    do {
        nombre = prompt("Ingrese nombre del producto:").toLowerCase();
            switch(nombre){
                case listaProductos[0].nombre:
                    listaProductos[0].stock = compra (listaProductos[0].codigo,listaProductos[0].precio,nombre,listaProductos[0].stock);
                    break;
                case listaProductos[1].nombre:
                    listaProductos[1].stock = compra (listaProductos[1].codigo,listaProductos[1].precio,nombre,listaProductos[1].stock);
                    break;
                case listaProductos[2].nombre:
                    listaProductos[2].stock = compra (listaProductos[2].codigo,listaProductos[2].precio,nombre,listaProductos[2].stock);
                    break;
                case listaProductos[3].nombre:
                    listaProductos[3].stock = compra (listaProductos[3].codigo,listaProductos[3].precio,nombre,listaProductos[3].stock);
                    break;
                case listaProductos[4].nombre:
                    listaProductos[4].stock = compra (listaProductos[4].codigo,listaProductos[4].precio,nombre,listaProductos[4].stock);
                    break;
                case "":
                    break;
                default:
                    alert("Articulo inexistente por favor elija otro producto ");
                    break;
            } 
    } while (nombre != "");
    menu();    
}

function mostrarCompra(){
    console.log(listaCompra);
    menu();
}

function borrarProducto(){
    nombre = prompt("Ingrese nombre del que desea borrar de su compra:").toLowerCase();
    let esta = false;
    for (i=0 ; i< listaCompra.length ; i++){
        if ( listaCompra[i].nombre == nombre){
            esta = true;
            listaCompra.splice(i,1);
            console.log(esta)
        }
    } 
    if(esta = false){
        alert("El articulo no esta en su lista de compra para borrar")
    }
    console.log(listaCompra);
    menu();
}

function stockProductos(){
    alert("Stock actualizado de los productos: \n"+listaProductos[0].nombre + " -> "+listaProductos[0].stock+"\n"+listaProductos[1].nombre + " -> "+listaProductos[1].stock+"\n"+listaProductos[2].nombre + " -> "+listaProductos[2].stock+"\n"+listaProductos[3].nombre + " -> "+listaProductos[3].stock+"\n"+listaProductos[4].nombre + " -> "+listaProductos[4].stock);
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
    let opcion = prompt("Menu: \n1 - Articulos\n2 - Stock productos \n3 - Ver articulos comprados \n4 - Completar compra");

    switch(opcion){
        case "1":
            productos();
            comprarProductos();
            break;
        case "2":
            stockProductos();
            break;
        case "3":
            mostrarCompra();
            break;
        case "4":
            borrarProducto();
            break;
        case "5":
            total();
            break;
        default:
            alert("Seleccione una opcion valida");
            menu()
            break;

    }
}
menu()
