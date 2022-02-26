class Producto{
    constructor(codigoProdu,nombreProdu,precioProdu,stockProdu) { 
        this.codigo = codigoProdu; //Este lo voy a utilizar mas adelante pero ya quiero dejarlo armado
        this.nombre = nombreProdu;
        this.precio = precioProdu;
        this.stock = stockProdu;    
    }
}

class Totales{
    constructor(totalArticulo){
        this.precio = totalArticulo;
    }
}

let nombre;
let comprado;
let confirma;
let listadoProductosMenu = "Estos son nuestros productos: "
let listadoProductosStock = "Stock de articulos:  "


let producto1 = new Producto(1,"conjunto deportivo",7199,30);
let producto2 = new Producto(2,"saco",6000,10);
let producto3 = new Producto(3,"remera hombre",800,100);
let producto4 = new Producto(4,"jean",2000,26);
let producto5 = new Producto(5,"remera deportiva mujer",1050,45);
let producto6 = new Producto(6,"remera deportiva",1300,45);
let producto7 = new Producto(7,"jean mujer",1800,20);

let listaProductos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7];
let listaCompra = [];
let listaTotal = [];
for(const producto of listaProductos){
    listadoProductosMenu += "\n" + producto.codigo + "- " + producto.nombre + "    $" + producto.precio;
}



function productos(){ 
    alert(listadoProductosMenu);
}

function calcularPrecio(precio,comprado){
    let precioTotal = new Totales((precio*comprado));
    listaTotal.push(precioTotal);
    console.log(listaTotal);       
}

function restaPrecio(indice){
    listaTotal.splice(indice,1);
    console.log(listaTotal);
}

function restaPrecio(precio,comprado){
    precioTotal -= precio;
}

function ajusteStock(stock,comprado){
    stock -= comprado;
    return stock;
}
function sumaStock(stock,comprado){
    stock += comprado;
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
    let agregado = new Producto(id,nombre,(precio*comprado),comprado);
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
                case listaProductos[5].nombre:
                    listaProductos[5].stock = compra (listaProductos[5].codigo,listaProductos[5].precio,nombre,listaProductos[5].stock);
                    break;
                case listaProductos[6].nombre:
                    listaProductos[6].stock = compra (listaProductos[6].codigo,listaProductos[6].precio,nombre,listaProductos[6].stock);
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
            restaPrecio(listaCompra[i].precio);
            switch(nombre){
                case listaProductos[0].nombre:
                    listaProductos[0].stock = sumaStock(listaProductos[0].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[1].nombre:
                    listaProductos[1].stock = sumaStock(listaProductos[1].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[2].nombre:
                    listaProductos[2].stock = sumaStock(listaProductos[2].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[3].nombre:
                    listaProductos[3].stock = sumaStock(listaProductos[3].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[4].nombre:
                    listaProductos[4].stock = sumaStock(listaProductos[4].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[5].nombre:
                    listaProductos[5].stock = sumaStock(listaProductos[5].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
                case listaProductos[6].nombre:
                    listaProductos[6].stock = sumaStock(listaProductos[6].stock,listaCompra[i].stock);
                    restaPrecio(i);
                    break;
            }
            listaCompra.splice(i,1);
        }
    }
    if(esta == false){
        alert("El articulo no esta en su lista de compra para borrar")
    }
    console.log(listaCompra);
    menu();
}

function stockProductos(){
    alert("Stock actualizado de los productos: \n"+listaProductos[0].nombre + " -> "+listaProductos[0].stock+"\n"+listaProductos[1].nombre + " -> "+listaProductos[1].stock+"\n"+listaProductos[2].nombre + " -> "+listaProductos[2].stock+"\n"+listaProductos[3].nombre + " -> "+listaProductos[3].stock+"\n"+listaProductos[4].nombre + " -> "+listaProductos[4].stock+"\n"+listaProductos[5].nombre + " -> "+listaProductos[5].stock+"\n"+listaProductos[6].nombre + " -> "+listaProductos[6].stock);
    menu();
}



function total(){
    const precioTotal = listaTotal.reduce((acc, el) => acc + el.precio, 0);
    if (precioTotal>=100000){
        alert("Su compra supera los $100000 tiene un descuento del 15%");
        precioTotal = precioTotal * 0.85;
    }
    alert("El total de su compra es de $"+precioTotal);
}

function filtrarProductos(){
    articulo = prompt("Como quiere filtrar los articulos:").toLowerCase();
    const resultado = listaProductos.filter((el) => el.nombre.includes(articulo));
    console.log(resultado);
    menu();
}

function buscarProductos(){
    articulo = prompt("Que articulo esta buscando:").toLowerCase();
    const resultado = listaProductos.find((el) => el.nombre === articulo);
    console.log(resultado);
    menu();
}



function menu(){
    let opcion = prompt("Menu: \n1 - Articulos\n2 - Stock productos \n3 - Filtrar articulos \n4 - Buscar articulo \n5 - Ver articulos comprados \n6 - Borrar articulo del carrito \n7 - Completar compra");

    switch(opcion){
        case "1":
            productos();
            comprarProductos();
            break;
        case "2":
            stockProductos();
            break;
        case "3":
            filtrarProductos(); 
            break;
        case "4":
            buscarProductos(); 
            break;
        case "5":
            mostrarCompra(); 
            break;
        case "6":
            borrarProducto();
            break;
        case "7":
            total();
            break;
        default:
            alert("Seleccione una opcion valida");
            menu()
            break;

    }
}
menu()
