//REGISTROS PRESUPUESTOS AMIGOS
//Totales
let totalGastado;
let gastoMaximoCategoria;
let cantidadAmigos = parseInt(prompt("¿Cuantos amigos pensas añadir a la cuenta?"));
let dineroDisponible = parseFloat(prompt("Cuanto dinero piensan gastar?"));
let limiteGastar;
let totalXAmigo;


let gastosPorCategoria = {};


// Datos Presupuesto index
function ingresarDatosAmigo() {
    let nombre = prompt("¿Cuál es el nombre de tu amigo a ingresar?");
    let valorGastado = parseFloat(prompt("¿Cuánto gastó?"));
    let categoria = prompt("¿En qué categoría?");
    let fecha = prompt("¿En qué fecha fue?");

    if (gastosPorCategoria[categoria]) {
        gastosPorCategoria[categoria] += valorGastado;
    } else {
        gastosPorCategoria[categoria] = valorGastado;
    }
    console.log("Gastos por categoría: ", gastosPorCategoria);
}

// Ingresa datos para cantidadAmigos
for (let i = 0; i < cantidadAmigos; i++) {
    ingresarDatosAmigo();
}



