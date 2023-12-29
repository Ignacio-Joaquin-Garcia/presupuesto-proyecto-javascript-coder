
let valorUSD = undefined;
fetch("https://exchange-rate-api1.p.rapidapi.com/latest?base=USD", {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': 'e0022187a6msh3bac010195377d0p1ef642jsned7e18271444',
        'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com'
    }
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        valorUSD = data.rates.ARS;
        const estadisticaElement = document.querySelectorAll(".t-limite");
        estadisticaElement.textContent = estadistica.estadistica;
        mostrarLimiteDisponible.estadistica = (("$"+valorUSD) || "Error con el servidor");
    })


//----------------------DECLARAMOS VARIABLES PRINCIPALES--------
let id = 0;
let totalGastado = 0;
let amigos = [];
let contadorAmigos = 0;
let totalGastoAmigo = 0;

let limite = 0;

let categoriaMaxGasto = "";
let categoriasGasto = [];
let maxGasto = 0;

let dineroDisponible = 0;

let datos = [];



let usuario;
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
//CREAMOS UN REGISTRO DE FECHAS POR MES para utilizar en grafico
function obtenerMes(fecha) {
    const fechaObj = new Date(fecha);
    return fechaObj.getMonth();
}
function inicializarDatosPorMes() {
    const datosPorMes = new Array(12).fill(0);
    const datosPorMesDisponible = new Array(12).fill(0);
    return datosPorMes, datosPorMesDisponible;
}
const datosPorMes = inicializarDatosPorMes();
const datosPorMesDisponible = inicializarDatosPorMes();



function obtenerLongitudRealAmigos() {
    const amigosUnicos = [...new Set(datos.map(dato => dato.amigo))];
    return amigosUnicos.length;
}
//--------FUNCIONES DE CARGA Y SUBIDA DE DATOS
function guardarEstadisticas(){
    localStorage.setItem("contadorAmigos", contadorAmigos);
    localStorage.setItem("total gastado", totalGastado);
    localStorage.setItem("textoMaxCategoria", categoriaMaxGasto);
    localStorage.setItem("datos", JSON.stringify(datos));
    localStorage.setItem("dineroDisponible", JSON.stringify(dineroDisponible));
    localStorage.setItem("limite", JSON.stringify(limite));
    localStorage.setItem("totalGastoAmigo", JSON.stringify(totalGastoAmigo));
}

function establecerEstadisticas(){
    let contadorAmigosGuardado = localStorage.getItem("contadorAmigos");
    if (contadorAmigosGuardado !== null && !isNaN(contadorAmigosGuardado)) {
        contadorAmigos = parseInt(contadorAmigosGuardado);
    }

    let totalGastadoGuardado = localStorage.getItem("total gastado");
    if (totalGastadoGuardado !== null && !isNaN(totalGastadoGuardado)) {
        totalGastado = parseInt(totalGastadoGuardado);
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

    usuario = JSON.parse(sessionStorage.getItem("usuario")) || "";
}

function recalcularDatosPorMesDisponible() {
    datosPorMesDisponible.fill(dineroDisponible);
}

function establecerDatos(){
    datos = JSON.parse(localStorage.getItem("datos")) || [];

    for(const data of datos){
        id+=1;
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

    datosPorMes.fill(0);

    for (const data of datos) {
        const mes = obtenerMes(data.fecha);
        datosPorMes[mes] += parseInt(data.gastoAmigo);
    }
    recalcularDatosPorMesDisponible();

    //RECREAMOS EL ARRAY CON CATEGORIAS, de esta forma nos ahorramos tener que guardarlo
    function crearArrayCategorias(){
        for (const dato of datos) {
            categoriasGasto[dato.categoria] === undefined ? categoriasGasto[dato.categoria] = parseInt(dato.gastoAmigo) : categoriasGasto[dato.categoria] += parseInt(dato.gastoAmigo);
        }
    }
    function crearArrayAmigo(){
        for (const dato of datos) {
            amigos[dato.amigo] === undefined ? amigos[dato.amigo] = parseInt(dato.gastoAmigo) : amigos[dato.amigo] += parseInt(dato.gastoAmigo);
        }
        contadorAmigos = obtenerLongitudRealAmigos();
    }
    crearArrayCategorias();
    crearArrayAmigo();
}

//----A tener en cuenta, se tiene que iniciar esta funcion antes de cargar cualquier elemento ya que contiene datos principales como variables
establecerEstadisticas();

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    totalGastoAmigo = Math.round(totalGastado / contadorAmigos);
    if(contadorAmigos === 0){
        totalGastoAmigo = 0;
    }

    mostrarTotalGastado.estadistica = "$" + totalGastado;
    mostrarGastoCategoria.estadistica = categoriaMaxGasto;
    mostrarDineroDisponible.estadistica = "$" + (dineroDisponible || 0);
    mostrarCantidadAmigos.estadistica = contadorAmigos;
    mostrarLimite.estadistica = "$" + (limite || 0);
    mostrarTotalGastoAmigo.estadistica = "$" + (totalGastoAmigo ?? 0);
    mostrarLimiteDisponible.estadistica = "$"+(valorUSD || "Error con el servidor");

    ARRAY_ESTADISTICAS.forEach((estadistica, index) => {
        const estadisticaElement = document.querySelectorAll(".t-gastado, .t-categoria, .t-disponible, .t-amigos, .t-limite, .t-gastar-amigo")[index];
        estadisticaElement.textContent = estadistica.estadistica;
    });

    guardarEstadisticas();
    graficos();
}



//----------------------------CREAMOS EL HTML--------------
let main = document.getElementById("main");

//---------------CARGA DE API CON CUENTA y estructura HTML para dar bienvenida
let sectionProfile = document.createElement("section");
sectionProfile.className = "profile";
main.appendChild(sectionProfile);
if (usuario && (usuario.nombre !== "" && usuario.email !== "" && usuario.password !== "")){
    sectionProfile.className = "profile";
    let imgProfile = document.createElement("img");
    imgProfile.src = "./assets/img/img-profile.png";
    let bienvenidoProfile = document.createElement("h2")
    bienvenidoProfile.innerHTML = `Bienvenido <span>${usuario.nombre}</span> !!`
    sectionProfile.appendChild(imgProfile);
    sectionProfile.appendChild(bienvenidoProfile)
} else{
    sectionProfile.className = "profile-login";
    let imgProfile = document.createElement("img");
    imgProfile.src = "./assets/img/img-profile.png";
    let noIngresoUsuario = document.createElement("a");
    noIngresoUsuario.href = "./pages/inicio-sesion.html";
    noIngresoUsuario.innerText = `Login`;
    sectionProfile.appendChild(imgProfile);
    sectionProfile.appendChild(noIngresoUsuario);
}


//Declaramos Section con posibles futuros graficos
let sectionGrafico = document.createElement("section");
sectionGrafico.className = "grafico";
main.appendChild(sectionGrafico);
let divTituloGrafico = document.createElement("div");
divTituloGrafico.innerHTML = `
                            <div class="titulo-grafico">
                                <h1>Grafico de Gastos</h1>
                                <img id="estadisticas" src="./assets/img/estadisticas.png" alt="icono estadisticas">
                            </div>
                            <div class="g-grafico">
                                <canvas id="miGrafica"></canvas>
                                <canvas id="fechasGrafico"></canvas>
                            </div>
                            `;
sectionGrafico.appendChild(divTituloGrafico);
let miCanvas = document.getElementById("miGrafica").getContext("2d");
let fechaCanva = document.getElementById("fechasGrafico").getContext("2d");


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

botonEliminarValoresGenerales.addEventListener("click", ()=>{
    sectionActualizarEstadisticas.style.display = "none"
})

botonAgregarValoresGenerales.addEventListener("click", ()=>{
    sectionActualizarEstadisticas.style.display = "block"
})


//------------------------------INPUTS QUE MODIFICAN ESTADISTICAS
    let sectionActualizarEstadisticas = document.createElement("section");
    sectionActualizarEstadisticas.className = "modificar-estadisticas-open";
    sectionActualizarEstadisticas.style.display = "none"
    main.appendChild(sectionActualizarEstadisticas);

    //---se incorpora el form que modifica las estadistica
    let formularioModificarEstadisticas = document.getElementById("modificar-estadisticas")
    sectionActualizarEstadisticas.appendChild(formularioModificarEstadisticas)

    function cambiarColorDineroDIsponible(){
        let divDineroDisponible = document.querySelector(".t-disponible");
        if (dineroDisponible < 0) {
            divDineroDisponible.classList.remove("positivo");
            divDineroDisponible.classList.add("negativo");
        } else {
            divDineroDisponible.classList.remove("negativo");
            divDineroDisponible.classList.add("positivo");
        }
    }

let nuevoDineroDisponible = 0;
let nuevoLimiteDisponible = 0;
    function registrarModificacion(){
        let InputNuevoDineroDisponible = document.getElementById("nuevo-dinero-disponible");
        let InputNuevoLimiteDisponible = document.getElementById("nuevo-limite-disponible");
        InputNuevoDineroDisponible.addEventListener("change", ()=>{
            nuevoDineroDisponible = parseInt(InputNuevoDineroDisponible.value);
        })
        InputNuevoLimiteDisponible.addEventListener("change", ()=>{
            nuevoLimiteDisponible = parseInt(InputNuevoLimiteDisponible.value);
        })
    }


    function subirNuevosDatosAEstadisticas(){
        let botonSubirDatos = document.getElementById("subir-datos");
        botonSubirDatos.addEventListener("click", ()=>{
            dineroDisponible = nuevoDineroDisponible;
            limite = nuevoLimiteDisponible;
            saberLimite = limite;
            cambiarColorDineroDIsponible();
            recalcularDatosPorMesDisponible()
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
let mostrarLimite = new estadistica("Limite a gastar en total", "$"+(limite || 0), "t-limite", "");
let mostrarLimiteDisponible = new estadistica("Valor Dolar Hoy en ARS", (valorUSD || "Añada un dato antes"), "t-limite", "");
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
    let datoAmigo = "";
    let gasto = 0;
    let categoria = "";
    let fecha = "";
    botonAñadir.addEventListener("click", function(){
        Swal.fire({
            title: "Ingreso de datos",
            icon: "info",
            html: `
                <input type="text" id="nombre-amigo" class="swal2-input" placeholder="Nombre del amigo">
                <input type="number" id="gasto" class="swal2-input" placeholder="Gasto">
                <input type="text" id="categoria" class="swal2-input" placeholder="¿En que categoria?">
                <input type="date" id="fecha" class="swal2-input">`,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                datoAmigo = Swal.getPopup().querySelector("#nombre-amigo").value;
                gasto = Swal.getPopup().querySelector("#gasto").value;
                categoria = Swal.getPopup().querySelector("#categoria").value;
                fecha = Swal.getPopup().querySelector("#fecha").value;
                if (!datoAmigo || !gasto || !categoria || !fecha) {
                    Swal.showValidationMessage("Completa todos los campos antes de continuar");
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                    id+=1;
                    //Codigo generador de registro de datos
                    let nuevoDato = new ingresarDatos(
                        id,
                        datoAmigo,
                        gasto,
                        categoria,
                        fecha
                    );
                    datos.push(nuevoDato);

                    //-----RECALCULAR CANT AMIGOS
                    amigos[nuevoDato.amigo] = (amigos[nuevoDato.amigo] || 0) + parseInt(nuevoDato.gastoAmigo);
                    let amigoExiste = false
                    amigos.forEach(amigo =>{
                        if(amigo === datoAmigo){
                            amigoExiste = true
                        }
                    })
                    if(amigoExiste === false){
                        contadorAmigos = obtenerLongitudRealAmigos();
                    }

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

                    //------------Registro de categorias existentes para luego sacar en cual se gasto mas
                    categoriasGasto[nuevoDato.categoria] = (categoriasGasto[nuevoDato.categoria] || 0) + parseInt(nuevoDato.gastoAmigo);
                    totalGastado = totalGastado + Math.round(parseFloat(nuevoDato.gastoAmigo));

                    //--------------Buscar de las categorias ingresadas por el user, en cual se gasto mas para luego poner en estadisticas
                    for (const categoria in categoriasGasto) {
                        if (categoriasGasto[categoria] > maxGasto) {
                            maxGasto = categoriasGasto[categoria];
                            categoriaMaxGasto = categoria;
                        }
                    }

                    dineroDisponible = dineroDisponible - Math.round(parseFloat(nuevoDato.gastoAmigo));
                    cambiarColorDineroDIsponible();



                //CREAR GASTOS POR FECHA
                datosPorMes.fill(0);
                for (const data of datos) {
                    const mes = obtenerMes(data.fecha);
                    datosPorMes[mes] += parseInt(data.gastoAmigo);
                }
                const mes = obtenerMes(nuevoDato.fecha);
                datosPorMesDisponible[mes] = dineroDisponible;


                actualizarEstadisticas();
                Swal.fire({
                    title: "Se agregaron los datos con exito!",
                    icon: "success"
                });
            } else{
                Swal.fire({
                    title: "Error al añadir los datos!",
                    icon: "warning"
                });
            }
        });
    });
}

function eliminarDatos() {
    let botonBorrar = document.querySelector(".eliminar-datos");
    botonBorrar.addEventListener("click", () => {
        id-=1;
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

            //-----RECALCULAR CANT AMIGOS
            amigos[datoEliminado.amigo] -= datoEliminado.gastoAmigo;
            if(amigos[datoEliminado.amigo] === 0){
                amigos.pop(datoEliminado.amigo)
            };
            contadorAmigos = obtenerLongitudRealAmigos();

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

            //Restar el gastos por fecha
            const mes = obtenerMes(datoEliminado.fecha);
            datosPorMes[mes] -= parseInt(datoEliminado.gastoAmigo);
            actualizarEstadisticas();
        }
    })
};


//-----------------------------HTML contenedor de los datos anteriores
let sectionDatosPresupuesto = document.createElement("section");
sectionDatosPresupuesto.className = "datos-presupuesto";
main.appendChild(sectionDatosPresupuesto);
sectionDatosPresupuesto.innerHTML = `
                                    <div class="cant-amigos">
                                        <img class="d-p-titulos" id="cant-amigos" src="./assets/img/cant-amigos.png" alt="doble tilde simbolico">
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
establecerDatos();

document.body.classList.toggle("claro");
function cargaModoClaro(){
    document.body.classList.toggle("claro");
    document.body.classList.contains("claro") ? localStorage.setItem("modo","claro") : localStorage.setItem("modo", "negro");
    let graficoImg = document.getElementById("estadisticas");
    let cantAmigosImg = document.getElementById("cant-amigos")
    graficoImg.src = "./assets/img/estadisticas-black.png";
    cantAmigosImg.src = "./assets/img/cant-amigos-black.png";
    if(localStorage.getItem("modo") === "negro"){
        graficoImg.src = "./assets/img/estadisticas.png";
        cantAmigosImg.src = "./assets/img/cant-amigos.png";
    }
}
const botonModo = document.getElementById("botonModo");
if(localStorage.getItem("modo", "claro")){
    cargaModoClaro()
}
botonModo.addEventListener("click", ()=>{
    cargaModoClaro()
});



eliminarDatos();
añadirDatos();
registrarModificacion();
subirNuevosDatosAEstadisticas();


function obtenerNombresCategorias() {
    return Object.keys(categoriasGasto);
}
function obtenerValoresCategorias() {
    return Object.values(categoriasGasto);
}


let colores = [];
for(const categoria in categoriasGasto){
    let color = `rgb(${parseInt(Math.random()*365)}, ${parseInt(Math.random()*365)}, ${parseInt(Math.random()*365)})`;
    colores.push(color);
}

let chart = new Chart(miCanvas,{
    type: "doughnut",
    data:{
        labels: obtenerNombresCategorias(),
        datasets: [
            {
                label:"Gasto",
                backgroundColor: colores,
                data: obtenerValoresCategorias(),
            }
        ],
    },
    options:{}
})

let chart1 = new Chart(fechaCanva,{
    type: "line",
    data:{
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: 'Gastos',
                data: datosPorMes,
                borderColor: "rgb(114, 24, 24)",
                backgroundColor: "rgb(114, 24, 24)",
            },
            {
                label: 'Dinero Disponible',
                data: datosPorMesDisponible,
                borderColor: "rgb(15, 77, 40)",
                backgroundColor: "rgb(15, 77, 40)",
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
        tooltip: {
            mode: 'index',
            intersect: false
        },
        title: {
            display: true,
            text: 'Gasto por Fecha'
        }
        },
        hover: {
        mode: 'index',
        intersec: false
        },
        scales: {
        x: {
            title: {
            display: true,
            text: 'Mes'
            }
        },
        y: {
            title: {
            display: true,
            text: 'Valor'
            },
            min: 0,
            max: (totalGastado + dineroDisponible),
            ticks: {
            // forces step size to be 50 units
            stepSize: 50
            }
        }
        }
    },
});


function graficos(){
    colores = [];
    for(const categoria in categoriasGasto){
        let color = `rgb(${parseInt(Math.random()*365)}, ${parseInt(Math.random()*365)}, ${parseInt(Math.random()*365)})`;
        colores.push(color);
    }
//--------------ACTUALIZACION GRAFICO DE TORTA
    chart.data.labels = obtenerNombresCategorias();
    chart.data.datasets[0].data = obtenerValoresCategorias();
    chart.data.datasets[0].backgroundColor = colores;
    chart.update();
//--------------ACTUALIZACION GRAFICO DE LINEA
    chart1.data.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    chart1.data.datasets[0].data = datosPorMes;
    chart1.data.datasets[1].data = datosPorMesDisponible;
    //chart1.options.scales.y.max = (totalGastado + dineroDisponible);
    const maxValue = Math.max(...datosPorMes, ...datosPorMesDisponible);
    chart1.options.scales.y.max = Math.ceil(maxValue / 100) * 100;
    chart1.update();
}
graficos();
