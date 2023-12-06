//----------------------DECLARAMOS VARIABLES PRINCIPALES--------
let totalGastado = 0;
let contadorAmigos = 0;
let totalGastoAmigo = 0;
let categoriasGasto = {};
let limite;                // =prompt("cuanto dinero limite piensan llegar a gastar entre todos?");
let saberLimite;
let textoSaberLimite;
let saberLimiteImg;
let colorTextoLimite;

let categoriaMaxGasto = "";
let maxGasto = 0;

let dineroDisponible;
let dineroDisponibleInput;

//-------------------------------------Clases Principales
class ingresarDatos{
    constructor(id, amigo, gastoAmigo, categoria, fecha){
        this.id = id,
        this.amigo = amigo,
        this.gastoAmigo = gastoAmigo,
        this.categoria = categoria,
        this.fecha = fecha
    }
}

class estadistica{
    constructor(titulo, estadistica, clase, img){
        this.titulo = titulo,
        this.estadistica = estadistica,
        this.clase = clase,
        this.img = img
    }
}


//-----------------------FUNCIONES
// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    mostrarTotalGastado.estadistica = "$" + totalGastado;
    mostrarGastoCategoria.estadistica = categoriaMaxGasto;
    mostrarDineroDisponible.estadistica = "$" + (dineroDisponible || 0);
    mostrarCantidadAmigos.estadistica = contadorAmigos;
    mostrarLimite.estadistica = "$" + (limite || 0);
    mostrarLimiteDisponible.estadistica = "$" + (saberLimite || 0);
    mostrarTotalGastoAmigo.estadistica = "$" + totalGastoAmigo;

    ARRAY_ESTADISTICAS.forEach((estadistica, index) => {
        const estadisticaElement = document.querySelectorAll(".t-gastado, .t-categoria, .t-disponible, .t-amigos, .t-limite, .t-gastar-amigo")[index];
        estadisticaElement.textContent = estadistica.estadistica;
    });
}



//----------------------------CREAMOS EL HTML--------------
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




//------------------------------ESTADISTICAS
//Botones que moodifiquen estadisticas
let sectionModificarEstadisticas = document.createElement("section");
sectionModificarEstadisticas.className = "modificar-estadisticas";
main.appendChild(sectionModificarEstadisticas);

let botonEliminarValoresGenerales = document.createElement("button");
let botonAgregarValoresGenerales = document.createElement("button");
botonAgregarValoresGenerales.className = "e-añadir";
botonEliminarValoresGenerales.className = "e-eliminar";
sectionModificarEstadisticas.appendChild(botonEliminarValoresGenerales);
sectionModificarEstadisticas.appendChild(botonAgregarValoresGenerales);

//botonAgregarValoresGenerales.addEventListener("click", function(){
    let sectionActualizarEstadisticas = document.createElement("section");
    sectionActualizarEstadisticas.className = "modificar-estadisticas-open"
    main.appendChild(sectionActualizarEstadisticas)

    let divModificarEstadisticasDinero = document.createElement("div");
    divModificarEstadisticasDinero.className = "mod-dinero-disponible"
    divModificarEstadisticasDinero.innerHTML = `
                                                <h2>Ingresar Nuevo Dinero Disponible</h2>
                                                `
    sectionActualizarEstadisticas.appendChild(divModificarEstadisticasDinero);

    let InputNuevoDinero = document.createElement("input");
    sectionActualizarEstadisticas.appendChild(InputNuevoDinero)



    let divModificarEstadisticasLimite = document.createElement("div");
    divModificarEstadisticasLimite.className = "mod-limite"
    sectionActualizarEstadisticas.appendChild(divModificarEstadisticasLimite);

//})

//Declaramos Section con todas las estadisticas del emulador
let sectionEstadisticas = document.createElement("section");
sectionEstadisticas.className = "estadisticas";
main.appendChild(sectionEstadisticas);

let mostrarTotalGastado = new estadistica("Total Gastado", "$"+totalGastado,"t-gastado", "");
let mostrarGastoCategoria = new estadistica("Gasto Maximo en Categoria", categoriaMaxGasto, "t-categoria", "");
let mostrarDineroDisponible = new estadistica("Dinero Disponible", "$"+(dineroDisponible || 0), "t-disponible", "");
let mostrarCantidadAmigos = new estadistica("Cant. Amigos", contadorAmigos, "t-amigos", "");
let mostrarLimite = new estadistica("Limite a gastar en total", "$"+(limite || 0), (colorTextoLimite || "t-limite"), (saberLimiteImg ?? ""));
let mostrarLimiteDisponible = new estadistica((textoSaberLimite || "No limite ingresado"), "$"+(saberLimite || 0), "t-limite", "")
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







//-----------------------------------------BOTON AÑADIR DATOS
let sectionAñadirBorrarDatos = document.createElement("section");
sectionAñadirBorrarDatos.className = "añadir-eliminar-datos";
sectionAñadirBorrarDatos.innerHTML = `
                                    <button type="button" class="eliminar-datos" >Eliminar Datos</button>
                                    <button type="button" class="agregar-datos">Añadir Datos</button>
                                    `
main.appendChild(sectionAñadirBorrarDatos);

let botonAñadir = document.querySelector(".agregar-datos");
botonAñadir.addEventListener("click", function(){
    //Codigo generador de registro de datos
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

    // Buscar de las categorias ingresadas por el user, en cual se gasto mas para luego poner en estadisticas
    for (const categoria in categoriasGasto) {
        if (categoriasGasto[categoria] > maxGasto) {
            maxGasto = categoriasGasto[categoria];
            categoriaMaxGasto = categoria;
        }
    }
    console.log("Categoría en la que se gastó más:", categoriaMaxGasto);
    console.log("Total gastado en esa categoría:", maxGasto);
    actualizarEstadisticas();
});

//-----------------------------HTML contenedor de los datos anteriores
let sectionDatosPresupuesto = document.createElement("section");
sectionDatosPresupuesto.className = "datos-presupuesto";
main.appendChild(sectionDatosPresupuesto);
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



