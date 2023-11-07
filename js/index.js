//REGISTROS PRESUPUESTOS AMIGOS
//Totales

let totalGastado = 0;
let gastoMaximoCategoria;
let cantidadAmigos = parseInt(prompt("¿Cuantos amigos pensas añadir a la cuenta?"));
let dineroDisponible = parseFloat(prompt("Cuanto dinero disponible tienen?"));
let limiteGastar = parseFloat(prompt("Dinero limite a gastar?"));
let totalXAmigo;


let gastosPorCategoria = {};

// Funcion para ingreso de Datos
function ingresarDatosAmigo() {
    let nombre = prompt("¿Cuál es el nombre de tu amigo a ingresar?");
    let valorGastado = parseFloat(prompt("¿Cuánto gastó?"));
    let categoria = prompt("¿En qué categoría?");
    //let fecha = prompt("¿En qué fecha fue?");

    if (gastosPorCategoria[categoria]) {
        gastosPorCategoria[categoria] += valorGastado;
    } else {
        gastosPorCategoria[categoria] = valorGastado;
    }
    console.log("Gastos por categoría: ", gastosPorCategoria);

    totalGastado += valorGastado;
}

// Ingresa datos para cantidadAmigos
for (let i = 0; i < cantidadAmigos; i++) {
    ingresarDatosAmigo();
}

// Muestra el total gastado
console.log("Total gastado: ", totalGastado);

function mostrarTotales(){
// totales
if (totalGastado > limiteGastar) {
    let limitePasado = totalGastado - limiteGastar;
    alert("¡Cuidado estas gastando mas que tu limite a gastar por:" + limitePasado + "!! :((");
} else if (totalGastado == limiteGastar){
    alert("Estas sobre tu presupuesto!!");
} else if (totalGastado < limiteGastar){
    alert("todavia podes seguir gastastando :)");
} else{
    alert("Error en datos ingresados, por favor ingresar monto a gastar y limite");
}

// Total por Amigos
totalXAmigo = totalGastado / cantidadAmigos;
console.log("Gastarian: " + totalXAmigo + " por amigo");
alert("Gastarian: " + totalXAmigo + " por amigo");

//Dinero nuevo Disponible
dineroDisponible = dineroDisponible - totalGastado;
alert("Te quedan $" + dineroDisponible + " disponible");
console.log("dinero disponible: " + dineroDisponible);
//limite
switch (dineroDisponible){
    case dineroDisponible > 0:
        alert("pueden seguir gastando :))!! les queda " + dineroDisponible);
        break;
    case dineroDisponible == 0:
        alert("Cuidado gastaron todo su dinero!!");
        break;
    case dineroDisponible < 0:
        alert("Cuidado estan gastando dinero que no tienen!!");
        break;
    default:
        console.log("datos de dineroDisponible no ingresados");
}
}




//CAMBIO MONEDAS EN BASE AL PESO ARGENTINO "BLUE"
const PESOS_ARGENTINOS = 1;
const EUROS = 1005;
const DOLARES = 925;

//Cambio Moneda Presupuesto
    function cambioMoneda(){
        let monedaACambiar = prompt("A que moneda deseas hacer el cambio? (dolares, euros, pesos argentinos), se ruega escribir identico a como se muestra").toLowerCase();
        switch(monedaACambiar) {
            case monedaACambiar = "euros":
                totalGastado = (totalGastado / EUROS).toFixed(2);
                dineroDisponible = (dineroDisponible / EUROS).toFixed(2);
                limiteGastar = (limiteGastar / EUROS).toFixed(2);
                totalXAmigo = (totalXAmigo / EUROS).toFixed(2);
                console.log("se registra cambio a euros");
                alert("Gastaste en total $" + totalGastado + " " + monedaACambiar);
                alert("Te queda en total $" + dineroDisponible + " " + monedaACambiar);
                alert("recuerde que a partir de ahora su moneda cambio a " + monedaACambiar);
                cambiarMoneda = false;
                return totalGastado, dineroDisponible, limiteGastar, totalXAmigo; //Devolvemos en formato euro, nueva moneda a partir de ahora
                break;
            case monedaACambiar = "dolares":
                totalGastado = (totalGastado / DOLARES).toFixed(2);
                dineroDisponible = (dineroDisponible / DOLARES).toFixed(2);
                limiteGastar = (limiteGastar / DOLARES).toFixed(2);
                totalXAmigo = (totalXAmigo / DOLARES).toFixed(2);
                console.log("se registra cambio a dolares");
                alert("Gastaste en total $" + totalGastado + " " + monedaACambiar);
                alert("Te queda en total $" + dineroDisponible +  " " + monedaACambiar);
                alert("recuerde que a partir de ahora su moneda cambio a " + monedaACambiar);
                cambiarMoneda = false;
                return totalGastado, dineroDisponible, limiteGastar, totalXAmigo; //Devolvemos en formato dolar, nueva moneda a partir de ahora
                break;
            default:
                alert("Ingrese un dato a cambiar valido");
                cambioMoneda();
        }
    }
    let cambiarMoneda = prompt("Desea cambiar el total que gastaron a otra moneda que no sea pesos argentinos? (Si/No)").toLowerCase();
    if(cambiarMoneda == "si"){
        console.log("se desea cambiar moneda");
        cambioMoneda();
    } else{console.log("No se desea cambiar moneda");}


let continuar = prompt("¿desea seguir agregando datos? (Si/No)").toLowerCase();
if (continuar != "si" && continuar != "no"){
    continuar = prompt("ingrese un dato valido (Si/No)").toLowerCase();
}
while(continuar == "si"){
    cantidadAmigos = parseInt(prompt("¿Cuantos amigos pensas añadir a la cuenta?"));
    dineroDisponible = parseFloat(prompt("Cuanto dinero disponible tienen?"));
    for (let i = 0; i < cantidadAmigos; i++) {
        ingresarDatosAmigo();
    }
    mostrarTotales();
    continuar = prompt("¿desea seguir agregando datos? (Si/No)").toLowerCase();

}


//Inicio de Sesion y Registro

//registro
class usuario {
    constructor(gmail, contraseña, repetirContraseña) {
    this.gmail,
    this.contraseña,
    this.repetirContraseña
    }

}