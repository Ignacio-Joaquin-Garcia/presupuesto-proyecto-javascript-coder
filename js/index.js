//----------------------DECLARAMOS VARIABLES PRINCIPALES--------
let totalGastado = 0;
let contadorAmigos = 0;
let totalGastoAmigo = 0;

let limite = 0;

let saberLimite = 0;
let saberLimiteImg = "";
let textoSaberLimite = "";
let colorTextoLimite = "";


let categoriaMaxGasto = "";
let categoriasGasto = [];
let maxGasto = 0;

let dineroDisponible = 0;

let datos = [];

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
//--------FUNCIONES DE CARGA Y SUBIDA DE DATOS
function guardarEstadisticas(){
    localStorage.setItem("total gastado", totalGastado);
    localStorage.setItem("contadorAmigos", contadorAmigos);
    localStorage.setItem("textoMaxCategoria", categoriaMaxGasto);

    localStorage.setItem("datos", JSON.stringify(datos));
    localStorage.setItem("dineroDisponible", JSON.stringify(dineroDisponible));
    localStorage.setItem("limite", JSON.stringify(limite));
    localStorage.setItem("totalGastoAmigo", JSON.stringify(totalGastoAmigo));


}

function establecerEstadisticas(){
    let totalGastadoGuardado = localStorage.getItem("total gastado");
    if (totalGastadoGuardado !== null && !isNaN(totalGastadoGuardado)) {
        totalGastado = parseInt(totalGastadoGuardado);
    }

    let contadorAmigosGuardado = localStorage.getItem("contadorAmigos");
    if (contadorAmigosGuardado !== null && !isNaN(contadorAmigosGuardado)) {
        contadorAmigos = parseInt(contadorAmigosGuardado);
    }

    let totalGastoAmigoGuardado = JSON.parse(localStorage.getItem("totalGastoAmigo"))
    if (totalGastoAmigoGuardado !== null && !isNaN(totalGastoAmigoGuardado)) {
        totalGastoAmigo = parseInt(totalGastoAmigoGuardado);
    }

    dineroDisponible = JSON.parse(localStorage.getItem("dineroDisponible"));
    limite = JSON.parse(localStorage.getItem("limite"));
    categoriaMaxGasto = localStorage.getItem("textoMaxCategoria");
    if (categoriaMaxGasto === null){
        categoriaMaxGasto = "";
    }
}

function establecerDatos(){
    datos = JSON.parse(localStorage.getItem("datos")) || [];
    
    for(const data of datos){
        console.log(data)
        let datos1 = document.getElementById("datos1");
        let datos2 = document.getElementById("datos2");
        let datos3 = document.getElementById("datos3");
        let datos4 = document.getElementById("datos4");
        let datos5 = document.getElementById("datos5");
        datos1.innerHTML += `<p>${data.id}</p>`;
        datos2.innerHTML += `<p>${data.amigo}</p>`;
        datos3.innerHTML += `<p>${data.gastoAmigo}</p>`;
        datos4.innerHTML += `<p>${data.categoria}</p>`;
        datos5.innerHTML += `<p>${data.fecha}</p>`;
    }

    //RECREAMOS EL ARRAY CON CATEGORIAS, de esta forma nos ahorramos tener que guardarlo
    function guardarArrayCategorias(){
        for (const dato of datos) {
            if (categoriasGasto[dato.categoria] === undefined) {
            categoriasGasto[dato.categoria] = dato.gastoAmigo;
            } else {
            categoriasGasto[dato.categoria] += dato.gastoAmigo;
            }
        }
    }
    guardarArrayCategorias()
    console.log(categoriasGasto)
}
//----A tener en cuenta, se tiene que iniciar esta funcion antes de cargar cualquier elemento ya que contiene datos principales como variables
establecerEstadisticas();

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    totalGastoAmigo = Math.round(totalGastado / contadorAmigos);

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

    guardarEstadisticas();

}

//funcion para calcular limite
/*
function calcularLimite() {
    saberLimite = limite - totalGastado;

    switch (true) {
        case saberLimite > 0:
            saberLimiteImg = "<img src='./assets/img/limite-ok.png' alt='dentro del límite permitido'>";
            textoSaberLimite = "Dinero antes de alcanzar el límite";
            colorTextoLimite = "t-limite-ok";
            break;
        case saberLimite < 0:
            saberLimiteImg = "<img src='./assets/img/limite-no.png' alt='fuera del límite permitido'>";
            textoSaberLimite = "Límite pasado por";
            colorTextoLimite = "t-limite-no";
            break;
        case saberLimite === 0:
            saberLimiteImg = "<img src='./assets/img/limite-ok.png' alt='dentro del límite permitido'>";
            textoSaberLimite = "Estás en tu límite";
            colorTextoLimite = "t-limite-ok";
            break;
        default:
            saberLimite = "ERROR";
            break;
    }

    return { img: saberLimiteImg, texto: textoSaberLimite, color: colorTextoLimite, limite: saberLimite };
}
*/

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
//------------------------------Botones que moodifiquen estadisticas
let sectionModificarEstadisticas = document.createElement("section");
sectionModificarEstadisticas.className = "modificar-estadisticas";
main.appendChild(sectionModificarEstadisticas);
let botonEliminarValoresGenerales = document.createElement("button");
let botonAgregarValoresGenerales = document.createElement("button");
botonAgregarValoresGenerales.className = "e-añadir";
botonEliminarValoresGenerales.className = "e-eliminar";
sectionModificarEstadisticas.appendChild(botonEliminarValoresGenerales);
sectionModificarEstadisticas.appendChild(botonAgregarValoresGenerales);


//------------------------------INPUTS QUE MODIFICAN ESTADISTICAS
    let sectionActualizarEstadisticas = document.createElement("section");
    sectionActualizarEstadisticas.className = "modificar-estadisticas-open";
    main.appendChild(sectionActualizarEstadisticas);

    //---se incorpora el form que modifica las estadistica
    let formularioModificarEstadisticas = document.getElementById("modificar-estadisticas")
    sectionActualizarEstadisticas.appendChild(formularioModificarEstadisticas)

    function cambiarColorDineroDIsponible(){
        let divDineroDisponible = document.querySelector(".t-disponible");
        if (dineroDisponible < 0) {
            divDineroDisponible.classList.remove("positivo");
            divDineroDisponible.classList.add("negativo");
            console.log("negativo");
        } else {
            divDineroDisponible.classList.remove("negativo");
            divDineroDisponible.classList.add("positivo");
            console.log("positivo");
        }
    }

let nuevoDineroDisponible = 0;
let nuevoLimiteDisponible = 0;
    function registrarModificacion(){
        let InputNuevoDineroDisponible = document.getElementById("nuevo-dinero-disponible");
        let InputNuevoLimiteDisponible = document.getElementById("nuevo-limite-disponible");
        InputNuevoDineroDisponible.addEventListener("change", ()=>{
            nuevoDineroDisponible = InputNuevoDineroDisponible.value;
            console.log("El nuevo Dinero Disponible va a ser de: "+nuevoDineroDisponible)
        })
        InputNuevoLimiteDisponible.addEventListener("change", ()=>{
            nuevoLimiteDisponible = parseInt(InputNuevoLimiteDisponible.value);
            console.log("El nuevo Limite Disponible va a ser de: "+nuevoLimiteDisponible)
        })
        //boton descartar
    }


    function subirNuevosDatosAEstadisticas(){
        let botonSubirDatos = document.getElementById("subir-datos");
        botonSubirDatos.addEventListener("click", ()=>{
            dineroDisponible = nuevoDineroDisponible;
            limite = nuevoLimiteDisponible;
            saberLimite = limite;
            console.log(dineroDisponible);
            console.log(limite)
            cambiarColorDineroDIsponible();
            actualizarEstadisticas();
        })
        let formulario = document.getElementById("modificar-estadisticas");
        formulario.addEventListener("submit", (event) => {
            // Evitar la recarga de la página
            event.preventDefault();
        })
        cambiarColorDineroDIsponible();
    }



//------------------------Declaramos Section con todas las estadisticas del emulador
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


function añadirDatos(){
    let botonAñadir = document.querySelector(".agregar-datos");
    botonAñadir.addEventListener("click", function(){
        function obtenerGastoAmigo(){
            let gastoAmigo;
            do {
                gastoAmigo = parseInt(prompt("Gasto del amigo:"));
                if (isNaN(gastoAmigo)) {
                    alert("Por favor, ingrese un número válido para el gasto del amigo.");
                }
            } while (isNaN(gastoAmigo));
            return gastoAmigo;
        }
        //Codigo generador de registro de datos
        contadorAmigos++;
        let nuevoDato = new ingresarDatos(
            contadorAmigos,
            prompt("Nombre del amigo:"),
            obtenerGastoAmigo(),
            prompt("Categoría del gasto:"),
            prompt("Fecha del gasto:")
        );
        if(isNaN(totalGastado)){

        }
        datos.push(nuevoDato);

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
        console.log(categoriasGasto)

        // Buscar de las categorias ingresadas por el user, en cual se gasto mas para luego poner en estadisticas
        for (const categoria in categoriasGasto) {
            if (categoriasGasto[categoria] > maxGasto) {
                maxGasto = categoriasGasto[categoria];
                categoriaMaxGasto = categoria;
            }
        }
        
        dineroDisponible = dineroDisponible - Math.round(parseFloat(nuevoDato.gastoAmigo));
        cambiarColorDineroDIsponible();



        console.log("Categoría en la que se gastó más:", categoriaMaxGasto);
        console.log("Total gastado en esa categoría:", maxGasto);
        actualizarEstadisticas();

        console.log(datos)

    });
}

function eliminarDatos() {
    let botonBorrar = document.querySelector(".eliminar-datos");
    botonBorrar.addEventListener("click", () => {
        console.log(datos);
        if (datos.length > 0) {
            let datoEliminado = datos.pop();

            let datos1 = document.getElementById("datos1");
            let datos2 = document.getElementById("datos2");
            let datos3 = document.getElementById("datos3");
            let datos4 = document.getElementById("datos4");
            let datos5 = document.getElementById("datos5");

            datos1.lastChild.remove();
            datos2.lastChild.remove();
            datos3.lastChild.remove();
            datos4.lastChild.remove();
            datos5.lastChild.remove();

            // Actualizar estadísticas después de eliminar un dato
            totalGastado -= Math.round(parseFloat(datoEliminado.gastoAmigo));
            dineroDisponible += Math.round(parseFloat(datoEliminado.gastoAmigo));
            cambiarColorDineroDIsponible();

            
            // Recalcular gasto máximo por categoría
            categoriasGasto[datoEliminado.categoria] -= datoEliminado.gastoAmigo;

            // Buscar de las categorías ingresadas por el usuario, en cuál se gastó más para luego poner en estadísticas
            maxGasto = 0;
            for (const categoria in categoriasGasto) {
                if (categoriasGasto[categoria] > maxGasto) {
                    maxGasto = categoriasGasto[categoria];
                    categoriaMaxGasto = categoria;
                }
            }

            if(maxGasto === 0){
                categoriasGasto=[];
                categoriaMaxGasto = "";
            }

            contadorAmigos--;

            console.log(categoriasGasto)
            console.log("Categoría en la que se gastó más:", categoriaMaxGasto);
            console.log("Total gastado en esa categoría:", maxGasto);

            actualizarEstadisticas();
        } else {
            console.log("No hay datos para eliminar");
        }
    })
};


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

//-------------UNA VEZ CREADO EL CONTENEDOR DE DATOS CARGAMOS LOS DATOS ANTERIORES
establecerDatos()


const botonModo = document.getElementById("botonModo");

botonModo.addEventListener("click", ()=>{
    document.body.classList.toggle("claro");
    if(document.body.classList.contains("claro")){
        localStorage.setItem("modo","claro");
    }else{
        localStorage.setItem("modo", "negro");
    }
});


















eliminarDatos();
añadirDatos();
registrarModificacion();
subirNuevosDatosAEstadisticas();
