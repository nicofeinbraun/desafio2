let producto1 = "conjunto deportivo";
let precio1 = 7199;
let stock1 = 30;

let producto2 = "saco";
let precio2 = 6000;
let stock2 = 10;

let producto3 = "remera hombre";
let precio3 = 800;
let stock3 = 100;

let producto4 = "jean";
let precio4 = 2000;
let stock4 = 26;

let producto5 = "remera deportiva mujer";
let precio5 = 1050;
let stock5 = 45;

let nombre;
let comprado;
let preciototal = 0;
let confirma;

function menu(){
    let opcion = prompt("Menu: \n1 - Articulos\n2 - Stock productos \n3 - Completar compra");

    switch(opcion){
        case "1":
            Productos();
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

function Productos(){
    
    alert("Los productos en stock son: \n"+producto1 +" $"+precio1+"\n"+producto2+" $"+precio2+"\n"+producto3+" $"+precio3+"\n"+producto4+" $"+precio4+"\n"+producto5+" $"+precio5);
}



function calcularPrecio(precio,comprado){
    preciototal += comprado * precio;
    console.log("Lllegue")
    
}

function ajusteStock(stock,comprado){
    stock -= comprado;
    console.log("Lllegue")
    return stock;
}

function Compra(precio,nombre,stock){
    comprado = parseInt(prompt("Cuantos desea comprar:"));
    if (comprado <= stock){
        calcularPrecio (precio,comprado);
        console.log(nombre+" cantidad "+ comprado + " = $"+(precio*comprado));
        stock = ajusteStock(stock,comprado);
    }
    else{
        alert("No tenemos stock suficiente de ese producto, puede comprar hasta " + stock + " unidades");
        confirma = prompt("Desea comprar el restante de articulos?")
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
                case producto1:
                    stock1 = Compra (precio1,nombre,stock1);
                    break;
                case producto2:
                    stock2 = Compra (precio2,nombre,stock2);
                    break;
                case producto3:
                    stock3 = Compra (precio3,nombre,stock3);
                    break;
                case producto4:
                    stock4 = Compra (precio4,nombre,stock4);
                    break;
                case producto5:
                    stock5 = Compra (precio5,nombre,stock5);
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
    alert("Stock actualizado de los productos: \n"+producto1 + " -> "+stock1+"\n"+producto2 + " -> "+stock2+"\n"+producto3 + " -> "+stock3+"\n"+producto4 + " -> "+stock4+"\n"+producto5 + " -> "+stock5);
    menu();
}

function total(){
    alert("El total de su compra es de $"+preciototal);
}

menu()