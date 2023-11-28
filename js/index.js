/* CODIGO REUTILIZADO DE LA ENTREGA 1
//REGISTROS PRESUPUESTOS AMIGOS
//Totales

let totalGastado;
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



while(continuar == "si"){
    cantidadAmigos = parseInt(prompt("¿Cuantos amigos pensas añadir a la cuenta?"));
    dineroDisponible = parseFloat(prompt("Cuanto dinero disponible tienen?"));
    for (let i = 0; i < cantidadAmigos; i++) {
        ingresarDatosAmigo();
    }
    mostrarTotales();
    continuar = prompt("¿desea seguir agregando datos? (Si/No)").toLowerCase();
}*/







//DESAFIO 2
function nuevaEtiqueta(nombreEtiqueta, etiqueta, clase, anidar){
    nombreEtiqueta = document.createElement(etiqueta);
    nombreEtiqueta.className = clase
    anidar.appendChild(nombreEtiqueta);
    return nombreEtiqueta;
    }; //funcion para crear etiquetas HTML

let totalGastado = 0;
let contadorAmigos = 0;
let totalGastoAmigo = 0;
let categoriasGasto = {};
let limite = prompt("cuanto dinero limite piensan llegar a gastar entre todos?");
let saberLimite;
let textoSaberLimite;
let saberLimiteImg;
let colorTextoLimite;

let dineroDisponibleInput = prompt("Dinero Disponible");
let dineroDisponible = parseFloat(dineroDisponibleInput);
while (isNaN(dineroDisponible)) {
    alert("Por favor, ingresa un valor numérico para el dinero disponible.");
    dineroDisponibleInput = prompt("Dinero Disponible");
    dineroDisponible = parseFloat(dineroDisponibleInput);
}
dineroDisponible = Math.round(dineroDisponible);
console.log("dinero disponible: "+dineroDisponible);


function calcularEstadisticas(){
    function calcularDineroDisponible(totalGastado, dineroDisponible){
        dineroDisponible -= totalGastado;
        return dineroDisponible;
    }; // Falta hacer funcion con funciones para llamarlas a todas en una
    function calcularTotalGastoAmigo(totalGastado, contadorAmigos){
        totalGastoAmigo = totalGastado / contadorAmigos;
        return totalGastoAmigo;
    };
    function calcularLimite(limite, totalGastado){
        saberLimite = limite - totalGastado;
        console.log(saberLimite);
        switch(true){
            case saberLimite > 0:
                saberLimiteImg = "<img src=./assets/img/limite-ok.png alt=dentro del limite permitido>";
                textoSaberLimite ="Dinero antes de alcanzar el limite";
                colorTextoLimite = "t-limite-ok"
                return saberLimiteImg, textoSaberLimite, colorTextoLimite;
            case saberLimite < 0:
                saberLimiteImg = "<img src=./assets/img/limite-no.png alt=fuera del limite permitido>";
                textoSaberLimite ="Limite pasado por";
                colorTextoLimite = "t-limite-no"
                return saberLimite, textoSaberLimite, colorTextoLimite;
            case saberLimite === 0:
                saberLimiteImg = "<img src=./assets/img/limite-ok.png alt=dentro del limite permitido>";
                textoSaberLimite ="Estas en tu limite";
                colorTextoLimite = "t-limite-ok"
                saberLimite = "";
                return saberLimiteImg, textoSaberLimite, limite, colorTextoLimite;
            default:
                alert("Error, ingresar dato válido");
                saberLimite="";
                return saberLimite;
        }
    }
    calcularLimite(limite, totalGastado);
    totalGastoAmigo = calcularTotalGastoAmigo(totalGastado, contadorAmigos);
    if (isNaN(totalGastoAmigo)){totalGastoAmigo = 0;};
    dineroDisponible = calcularDineroDisponible(totalGastado, dineroDisponible);
    return totalGastoAmigo, dineroDisponible, saberLimite;
}




let main = document.createElement("main");
document.body.appendChild(main);

//Declaramos Section con posibles futuros graficos
let sectionGrafico = document.createElement("section");
sectionGrafico.className = "grafico";
main.appendChild(sectionGrafico);
let divTituloGrafico = document.createElement("div");
divTituloGrafico.innerHTML = `
                            <div class="titulo-grafico">
                                <h1>Grafico de Gastos</h1>
                                <img src="./assets/img/estadisticas.png" alt="icono estadisticas">
                            </div>
                            `;
sectionGrafico.appendChild(divTituloGrafico);


//Declaramos Section con todas las estadisticas del emulador
let sectionEstadisticas = document.createElement("section");
sectionEstadisticas.className = "estadisticas";
main.appendChild(sectionEstadisticas);




//Declaramos section con botones para crear o eliminar datos
let sectionAñadirBorrarDatos = document.createElement("section");
sectionAñadirBorrarDatos.className = "añadir-eliminar-datos";
sectionAñadirBorrarDatos.innerHTML = `
                                    <button type="button" class="eliminar-datos bounce-top" >Eliminar Datos</button>
                                    <button type="button" class="agregar-datos bounce-top">Añadir Datos</button>
                                    `
main.appendChild(sectionAñadirBorrarDatos);


//Se declara section con todos los datos que generara el usuario
let sectionDatosPresupuesto = document.createElement("section");
sectionDatosPresupuesto.className = "datos-presupuesto";
main.appendChild(sectionDatosPresupuesto);


//Constructor de datos
class ingresarDatos{
    constructor(id, amigo, gastoAmigo, categoria, fecha){
        this.id = id,
        this.amigo = amigo,
        this.gastoAmigo = gastoAmigo,
        this.categoria = categoria,
        this.fecha = fecha
    }
}

sectionDatosPresupuesto.innerHTML = `
                                    <div class="cant-amigos">
                                        <img class="d-p-titulos" src="./assets/img/cant-amigos.png" alt="doble tilde simbolico">
                                        <div id="datos1" class="datos">
                                        </div>
                                    </div>
                                    <div class="nombre-amigo">
                                        <h2 class="d-p-titulos">Amigo</h2>
                                        <div id="datos2" class="datos">
                                        </div>
                                    </div>
                                    <div class="gasto-amigo">
                                        <h2 class="d-p-titulos">Gastado</h2>
                                        <div id="datos3" class="datos">
                                        </div>
                                    </div>
                                    <div class="categoria-amigo">
                                        <h2 class="d-p-titulos">Categoria</h2>
                                        <div id="datos4" class="datos">
                                        </div>
                                    </div>
                                    <div class="fecha-amigo">
                                        <h2 class="d-p-titulos">Fecha</h2>
                                        <div id="datos5" class="datos">
                                        </div>
                                    </div>
                                    `;



let continuar = prompt("¿desea añadir datos? (Si/No)").toLowerCase();
if (continuar != "si" && continuar != "no"){continuar = prompt("ingrese un dato valido (Si/No)").toLowerCase();}
while (continuar === "si") {
    contadorAmigos++;
    let nuevoDato = new ingresarDatos(
        contadorAmigos,
        prompt("Nombre del amigo:"),
        parseInt(prompt("Gasto del amigo:")),
        prompt("Categoría del gasto:"),
        prompt("Fecha del gasto:")
    );

    let datos1 = document.getElementById("datos1");
    let datos2 = document.getElementById("datos2");
    let datos3 = document.getElementById("datos3");
    let datos4 = document.getElementById("datos4");
    let datos5 = document.getElementById("datos5");
    datos1.innerHTML += `<p>${nuevoDato.id}</p>`;
    datos2.innerHTML += `<p>${nuevoDato.amigo}</p>`;
    datos3.innerHTML += `<p>${nuevoDato.gastoAmigo}</p>`;
    datos4.innerHTML += `<p>${nuevoDato.categoria}</p>`;
    datos5.innerHTML += `<p>${nuevoDato.fecha}</p>`;

    //Registro de categorias existentes para luego sacar en cual se gasto mas
    categoriasGasto[nuevoDato.categoria] = (categoriasGasto[nuevoDato.categoria] || 0) + nuevoDato.gastoAmigo;
    totalGastado = totalGastado + Math.round(parseFloat(nuevoDato.gastoAmigo));
    console.log("total gastado: "+totalGastado);
    console.log(nuevoDato);
    continuar = prompt("¿Quieres seguir agregando datos de amigos? si/no").toLocaleLowerCase();
    if (continuar != "si" && continuar != "no"){continuar = prompt("ingrese un dato valido (Si/No)").toLowerCase();}
}

// Buscar de las categorias ingresadas por el user, en cual se gasto mas para luego poner en estadisticas
let categoriaMaxGasto = "";
let maxGasto = 0;
for (const categoria in categoriasGasto) {
    if (categoriasGasto[categoria] > maxGasto) {
        maxGasto = categoriasGasto[categoria];
        categoriaMaxGasto = categoria;
    }
}
console.log("Categoría en la que se gastó más:", categoriaMaxGasto);
console.log("Total gastado en esa categoría:", maxGasto);









//declaramos las estadisticas totales despues de ingrasar todos los datos

class estadistica{
    constructor(titulo, estadistica, clase, img){
        this.titulo = titulo,
        this.estadistica = estadistica,
        this.clase = clase,
        this.img = img
    }
}

calcularEstadisticas();
let mostrarTotalGastado = new estadistica("Total Gastado", "$"+totalGastado,"t-gastado", "");
let mostrarGastoCategoria = new estadistica("Gasto Maximo en Categoria", categoriaMaxGasto, "t-categoria", "");
let mostrarDineroDisponible = new estadistica("Dinero Disponible", "$"+dineroDisponible, "t-disponible", "");
let mostrarCantidadAmigos = new estadistica("Cant. Amigos", contadorAmigos, "t-amigos", "");
let mostrarLimite = new estadistica("Limite a gastar en total", "$"+limite, colorTextoLimite, saberLimiteImg);
let mostrarLimiteDisponible = new estadistica(textoSaberLimite, "$"+saberLimite, "t-limite", "")
let mostrarTotalGastoAmigo = new estadistica("Total a gastar x Amigo", "$"+totalGastoAmigo, "t-gastar-amigo", "");



const ARRAY_ESTADISTICAS = [mostrarTotalGastado, mostrarGastoCategoria, mostrarDineroDisponible, mostrarCantidadAmigos, mostrarLimite, mostrarLimiteDisponible, mostrarTotalGastoAmigo];

    ARRAY_ESTADISTICAS.forEach(estadistica =>{
    let divCards = document.createElement("div");
    divCards.className = "e-rectangulo";
    divCards.innerHTML = `
                        <h2>${estadistica.titulo}</h2>
                        <div class="estadisticas-p-img">
                            ${estadistica.img}
                            <p class="${estadistica.clase}">${estadistica.estadistica}</p>
                        </div>
                        `;
    sectionEstadisticas.appendChild(divCards);
    })










//Inicio de Sesion y Registro


class iniciarSesion {
    constructor(nombre, apellido, gmail, contraseña){
        this.nombre = nombre,
        this.apellido = apellido,
        this.gmail = gmail,
        this.contraseña = contraseña
    }
}




class registrarse {
    constructor(nuevoNombre, nuevoApellido, nuevoGmail, nuevaContraseña, repetirNuevaContraseña) {
    this.nuevoNombre = nuevoNombre,
    this.nuevoApellido = nuevoApellido,
    this.nuevoGmail = nuevoGmail,
    this.nuevaContraseña = nuevaContraseña,
    this.repetirNuevaContraseña = repetirNuevaContraseña
    }
}












